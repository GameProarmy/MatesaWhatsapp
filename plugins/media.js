const Matesa = require("../Utilis/events")
const { MessageType, Mimetype } = require("@adiwajshing/baileys")
const fs = require("fs")
const Language = require("../language")
const Lang = Language.getString("media")
const fsExtra = require("fs-extra")
// const config = require('../config');
const { pdf } = require("../Utilis/download")
const {
  audioCut,
  videoTrim,
  mergeVideo,
  getFfmpegBuffer,
  videoHeightWidth,
  avm,
  blackVideo,
  cropVideo,
} = require("../Utilis/fFmpeg")
let fm = true

Matesa.addCommand(
  { pattern: "rotate ?(.*)", fromMe: true, desc: Lang.ROTATE_DESC },
  async (message, match) => {
    if (!message.reply_message || !message.reply_message.video)
      return await message.sendMessage(Lang.NEED_REPLY)
    if (match === "") return await message.sendMessage(Lang.CHOOSE)
    let location = await message.reply_message.downloadAndSaveMediaMessage(
      "rotate"
    )
    if (/right/.test(match)) {
      await message.sendMessage(Lang.DOWNLOADING)
      return await message.sendMessage(
        await getFfmpegBuffer(location, "orotate.mp4", "right"),
        { mimetype: Mimetype.mp4, quoted: message.data },
        MessageType.video
      )
    } else if (/left/.test(match)) {
      await message.sendMessage(Lang.DOWNLOADING)
      return await message.sendMessage(
        await getFfmpegBuffer(location, "orotate.mp4", "left"),
        { mimetype: Mimetype.mp4, quoted: message.data },
        MessageType.video
      )
    } else if (/flip/.test(match)) {
      await message.sendMessage(Lang.DOWNLOADING)
      return await message.sendMessage(
        await getFfmpegBuffer(location, "orotate.mp4", "flip"),
        { mimetype: Mimetype.mp4, quoted: message.data },
        MessageType.video
      )
    } else await message.sendMessage(Lang.WRONG)
  }
)

Matesa.addCommand(
  { pattern: "mp3", fromMe: fm, desc: Lang.MP3_DESC },
  async (message, match) => {
    if (
      !message.reply_message ||
      (!message.reply_message.video && !message.reply_message.audio)
    )
      return await message.sendMessage(Lang.MP3_NEED_REPLY)
    return await message.sendMessage(
      await getFfmpegBuffer(
        await message.reply_message.downloadAndSaveMediaMessage("mp3"),
        "mp3.mp3",
        "mp3"
      ),
      {
        filename: "mp3.mp3",
        mimetype: Mimetype.mp3,
        ptt: !message.reply_message.ptt,
        quoted: message.data,
      },
      MessageType.audio
    )
  }
)

Matesa.addCommand(
  { pattern: "photo", fromMe: fm, desc: Lang.PHOTO_DESC },
  async (message, match) => {
    if (
      !message.reply_message.sticker ||
      message.reply_message === false ||
      message.reply_message.animated
    )
      return await message.sendMessage(Lang.SNEED)
    return await message.sendMessage(
      await getFfmpegBuffer(
        await message.reply_message.downloadAndSaveMediaMessage("photo"),
        "photo.png",
        "photo"
      ),
      { quoted: message.data },
      MessageType.image
    )
  }
)

Matesa.addCommand(
  { pattern: "reverse", fromMe: true, desc: Lang.REVERSE_DESC },
  async (message, match) => {
    if (
      !message.reply_message.audio &&
      !message.reply_message.video &&
      !message.reply_message
    )
      return await message.sendMessage(Lang.RE_NEED_REPLY)
    let location = await message.reply_message.downloadAndSaveMediaMessage(
      "reverse"
    )
    if (message.reply_message.video == true) {
      return await message.sendMessage(
        await getFfmpegBuffer(location, "revered.mp4", "videor"),
        { mimetype: Mimetype.mp4, quoted: message.data },
        MessageType.video
      )
    } else if (message.reply_message.audio == true) {
      return await message.sendMessage(
        await getFfmpegBuffer(location, "revered.mp3", "audior"),
        {
          filename: "revered.mp3",
          mimetype: Mimetype.mp3,
          ptt: false,
          quoted: message.data,
        },
        MessageType.audio
      )
    }
  }
)

Matesa.addCommand(
  { pattern: "cut ?(.*)", fromMe: fm, desc: Lang.CUT_DESC },
  async (message, match) => {
    if (!message.reply_message || !message.reply_message.audio)
      return await message.sendMessage(Lang.NEED_CUT_REPLY)
    if (match === "") return await message.sendMessage(Lang.CUT_NEED_REPLY)
    let start = match.split(";")[0]
    let duration = match.split(";")[1]
    if (
      start == "" ||
      duration == "" ||
      start == undefined ||
      duration == undefined ||
      isNaN(start) ||
      isNaN(duration)
    )
      return await message.sendMessage(Lang.SYNTAX)
    return await message.sendMessage(
      await audioCut(
        await message.reply_message.downloadAndSaveMediaMessage("cut"),
        start.trim(),
        duration.trim()
      ),
      {
        filename: "cut.mp3",
        mimetype: Mimetype.mp3,
        ptt: false,
        quoted: message.data,
      },
      MessageType.audio
    )
  }
)

Matesa.addCommand(
  { pattern: "trim ?(.*)", fromMe: fm, desc: Lang.TRIM_DESC },
  async (message, match) => {
    if (!message.reply_message || !message.reply_message.video)
      return await message.sendMessage(Lang.NEED_REPLY)
    if (match === "") return await message.sendMessage(Lang.TRIM_NEED_REPLY)
    let start = match.split(";")[0]
    let duration = match.split(";")[1]
    if (
      start == "" ||
      duration == "" ||
      start == undefined ||
      duration == undefined ||
      isNaN(start) ||
      isNaN(duration)
    )
      return await message.sendMessage(Lang.SYNTAX)
    return await message.sendMessage(
      await videoTrim(
        await message.reply_message.downloadAndSaveMediaMessage("trim"),
        start,
        duration
      ),
      { mimetype: Mimetype.mp4, quoted: message.data },
      MessageType.video
    )
  }
)
Matesa.addCommand(
  { pattern: "page ?(.*)", fromMe: fm, desc: "Görüntü eklemek için." },
  async (message, match) => {
    if (!message.reply_message || !message.reply_message.image)
      return await message.sendMessage("*Bir resme yanıt verin.*")
    if (isNaN(match))
      return await message.sendMessage(
        "*Sipariş numarasıyla yanıtlayın*\n*örn: .page 1*"
      )
    if (!fs.existsSync("./pdf")) {
      fs.mkdirSync("./pdf")
    }
    await message.reply_message.downloadAndSaveMediaMessage(`./pdf/${match}`)
    return await message.sendMessage("```Sayfa eklendi``` " + match)
  }
)

Matesa.addCommand(
  {
    pattern: "pdf ?(.*)",
    fromMe: fm,
    desc: "Görüntüleri pdf'ye dönüştürün.",
  },
  async (message, match) => {
    if (!fs.existsSync("./pdf")) {
      fs.mkdirSync("./pdf")
    }
    let length = fs.readdirSync("./pdf").length
    if (length == 0)
      return await message.sendMessage(
        "```Sayfaları``` _page_ *komutu ile sırayla ekleyin.*"
      )
    let pages = []
    let i = 1
    while (i <= length) {
      let path = "./pdf/" + i + ".jpeg"
      if (fs.existsSync(path)) {
        pages.push(path)
        i++
      } else return message.sendMessage("```" + `Missing page ${i}` + "```")
    }
    await message.sendMessage("```pdf yükleniyor...``` ")
    pdf(pages)
      .pipe(fs.createWriteStream("./pdf.pdf"))
      .on("finish", async () => {
        fsExtra.emptyDirSync("./pdf")
        return await message.sendMessage(
          fs.readFileSync("pdf.pdf"),
          {
            filename: Math.floor(Math.random() * 999999),
            mimetype: Mimetype.pdf,
            quoted: message.data,
          },
          MessageType.document
        )
      })
  }
)

Matesa.addCommand(
  { pattern: "merge ?(.*)", fromMe: true, desc: "Videoları birleştir" },
  async (message, match) => {
    if (!fs.existsSync("./media/merge")) {
      fs.mkdirSync("./media/merge")
    }
    if (
      match == "" &&
      message.reply_message != false &&
      !message.reply_message.video
    )
      return await message.sendMessage(Lang.NEED_REPLY)
    if (match == "" && isNaN(match))
      return await message.sendMessage(
        "*Sipariş numarasıyla yanıtla*\n*örnk: .merge 1*"
      )
    if (/[0-9]+/.test(match)) {
      await message.reply_message.downloadAndSaveMediaMessage(
        "./media/merge/" + match
      )
      return await message.sendMessage("```video " + match + " added```")
    } else {
      let length = fs.readdirSync("./media/merge").length
      if (!(length > 0))
        return await message.sendMessage(
          "```Videoları sırayla ekleyin.```\n*Örnek .merge 1*"
        )
      await message.sendMessage("```Merging " + length + " videos...```")
      return await message.sendMessage(
        await mergeVideo(length),
        { mimetype: Mimetype.mp4, quoted: message.data },
        MessageType.video
      )
    }
  }
)

Matesa.addCommand(
  { pattern: "compress ?(.*)", fromMe: true, desc: Lang.COMPRESS_DESC },
  async (message, match) => {
    if (!message.reply_message || !message.reply_message.video)
      return await message.sendMessage(Lang.NEED_REPLY)
    return await message.sendMessage(
      await getFfmpegBuffer(
        await message.reply_message.downloadAndSaveMediaMessage("compress"),
        "ocompress.mp4",
        "compress"
      ),
      { quoted: message.data },
      MessageType.video
    )
  }
)

Matesa.addCommand(
  { pattern: "bass ?(.*)", fromMe: true, desc: Lang.LOW_DESC },
  async (message, match) => {
    if (!message.reply_message || !message.reply_message.audio)
      return await message.sendMessage(Lang.NEED_CUT_REPLY)
    return await message.sendMessage(
      await getFfmpegBuffer(
        await message.reply_message.downloadAndSaveMediaMessage("basso"),
        "bass.mp3",
        `bass,${match == "" ? 10 : match}`
      ),
      { mimetype: Mimetype.mp4Audio, quoted: message.data },
      MessageType.audio
    )
  }
)

Matesa.addCommand(
  { pattern: "treble ?(.*)", fromMe: true, desc: Lang.LOW_DESC },
  async (message, match) => {
    if (!message.reply_message || !message.reply_message.audio)
      return await message.sendMessage(Lang.NEED_CUT_REPLY)
    return await message.sendMessage(
      await getFfmpegBuffer(
        await message.reply_message.downloadAndSaveMediaMessage("trebleo"),
        "treble.mp3",
        `treble,${match == "" ? 10 : match}`
      ),
      { mimetype: Mimetype.mp4Audio, quoted: message.data },
      MessageType.audio
    )
  }
)

Matesa.addCommand(
  { pattern: "histo", fromMe: true, desc: Lang.UNVOICE_DESC },
  async (message, match) => {
    if (!message.reply_message || !message.reply_message.audio)
      return await message.sendMessage(Lang.NEED_CUT_REPLY)
    return await message.sendMessage(
      await getFfmpegBuffer(
        await message.reply_message.downloadAndSaveMediaMessage("histo"),
        "histo.mp4",
        "histo"
      ),
      { mimetype: Mimetype.mp4, quoted: message.data },
      MessageType.video
    )
  }
)

Matesa.addCommand(
  { pattern: "vector", fromMe: true, desc: Lang.UNVOICE_DESC },
  async (message, match) => {
    if (!message.reply_message || !message.reply_message.audio)
      return await message.sendMessage(Lang.NEED_CUT_REPLY)
    return await message.sendMessage(
      await getFfmpegBuffer(
        await message.reply_message.downloadAndSaveMediaMessage("vector"),
        "vector.mp4",
        "vector"
      ),
      { mimetype: Mimetype.mp4, quoted: message.data },
      MessageType.video
    )
  }
)
Matesa.addCommand(
  {
    pattern: "crop ?(.*)",
    fromMe: true,
    desc: "Videoyu kırpmak için\nÖrnek \n.crop 512,512,0,512\n.crop outW,outH,WtoCrop,HtoCrop",
  },
  async (message, match) => {
    if (!message.reply_message || !message.reply_message.video)
      return await message.sendMessage(Lang.NEED_REPLY)
    const [vw, vh, w, h] = match.split(",")
    if (
      !vh ||
      !vw ||
      !w ||
      !h ||
      typeof +vh !== "number" ||
      typeof +w !== "number" ||
      typeof +h !== "number" ||
      typeof +vw !== "number"
    )
      return await message.sendMessage(
        `*Örnek :*\ncrop out_w,out_h,x,y\nkırpmaya başlamak için sol üsttedir`
      )
    const location = await message.reply_message.downloadAndSaveMediaMessage(
      "plain"
    )
    const { height, width } = await videoHeightWidth(location)
    if (vw > width || vh > height)
      return await message.sendMessage(
          `*Video genişliği: ${width}, height: ${height}*\n*Aradaki çıktı boyutunu seçin.*`
      )
    return await message.sendMessage(
      await cropVideo(location, vw, vh, w, h),
      { mimetype: Mimetype.mp4, quoted: message.data },
      MessageType.video
    )
  }
)

Matesa.addCommand(
  { pattern: "low", fromMe: true, desc: Lang.LOW_DESC },
  async (message, match) => {
    if (!message.reply_message || !message.reply_message.audio)
      return await message.sendMessage(Lang.NEED_CUT_REPLY)
    return await message.sendMessage(
      await getFfmpegBuffer(
        await message.reply_message.downloadAndSaveMediaMessage("lowmp3"),
        "lowmp3.mp3",
        "pitch"
      ),
      { filename: "lowmp3.mp3", mimetype: Mimetype.mp3, quoted: message.data },
      MessageType.audio
    )
  }
)
Matesa.addCommand(
  { pattern: "pitch", fromMe: true, desc: Lang.PITCH_DESC },
  async (message, match) => {
    if (!message.reply_message || !message.reply_message.audio)
      return await message.sendMessage(Lang.NEED_CUT_REPLY)
    return await message.sendMessage(
      await getFfmpegBuffer(
        await message.reply_message.downloadAndSaveMediaMessage("pitchmp3"),
        "lowmp3.mp3",
        "lowmp3"
      ),
      { filename: "lowmp3.mp3", mimetype: Mimetype.mp3, quoted: message.data },
      MessageType.audio
    )
  }
)
Matesa.addCommand(
  { pattern: "avec", fromMe: true, desc: Lang.AVEC_DESC },
  async (message, match) => {
    if (!message.reply_message || !message.reply_message.audio)
      return await message.sendMessage(Lang.NEED_CUT_REPLY)
    return await message.sendMessage(
      await getFfmpegBuffer(
        await message.reply_message.downloadAndSaveMediaMessage("avec"),
        "avec.mp4",
        "avec"
      ),
      { mimetype: Mimetype.mp4, quoted: message.data },
      MessageType.video
    )
  }
)

Matesa.addCommand(
  { pattern: "avm", fromMe: true, desc: "Ses ve videoyu birleştir" },
  async (message, match) => {
    if (!fs.existsSync("./media/avm")) {
      fs.mkdirSync("./media/avm")
    }
    let files = fs.readdirSync("./media/avm/")
    if (
      (!message.reply_message && files.length < 2) ||
      (message.reply_message &&
        !message.reply_message.audio &&
        !message.reply_message.video)
    )
      return await message.sendMessage(
        "*birleştirmek için ses ve video ekle*\n*Mesajı Yanıtla.*"
      )
    if (message.reply_message.audio) {
      await message.reply_message.downloadAndSaveMediaMessage(
        "./media/avm/audio"
      )
      return await message.sendMessage("```Ses eklendi.```")
    }
    if (message.reply_message.video) {
      await message.reply_message.downloadAndSaveMediaMessage(
        "./media/avm/video"
      )
      return await message.sendMessage("```Video eklendi.```")
    }
    return await message.sendMessage(
      await avm(files),
      { quoted: message.data },
      MessageType.video
    )
  }
)

Matesa.addCommand(
  { pattern: "black", fromMe: true, desc: "Sesten Videoya." },
  async (message, match) => {
    if (!message.reply_message || !message.reply_message.audio)
      return await message.sendMessage("*Sesi yanıtla!*")
    await message.sendMessage(
      await blackVideo(
        await message.reply_message.downloadAndSaveMediaMessage("black")
      ),
      { quoted: message.data },
      MessageType.video
    )
  }
)
