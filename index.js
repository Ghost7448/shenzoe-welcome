require("dotenv").config();

const {
    Client,
    GatewayIntentBits,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

// ===========================
// الإعدادات
// ===========================

const WELCOME_CHANNEL_ID = "1497207025363456061";
const RULES_CHANNEL_ID = "1335016310190379110";

// ===========================
// دخول عضو جديد
// ===========================

client.on("guildMemberAdd", async (member) => {

    const channel = member.guild.channels.cache.get(WELCOME_CHANNEL_ID);
    if (!channel) return;

    const embed = new EmbedBuilder()

        .setColor("#f1c40f")

        .setTitle("🎉 أهلاً بك في Shenzoe Communtity")

        .setDescription(`
💙 أهلاً وسهلاً بك يا ${member}

━━━━━━━━━━━━━━━━━━

👤 معلومات عضويتك

📝 الاسم:
\`${member.user.username}\`

🆔 ID:
\`${member.user.id}\`

📅 تاريخ الدخول:
<t:${Math.floor(Date.now() / 1000)}:F>

━━━━━━━━━━━━━━━━━━

📋 القوانين المهمة

✅ اقرأ جميع القوانين قبل البدء  
✅ احترم جميع الأعضاء  
✅ لا تشارك محتوى مزعج  
🎉 استمتع بالمجتمع

━━━━━━━━━━━━━━━━━━
`)

        // صورة العضو (فوق يمين)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))

        // الصورة الكبيرة
        .setImage("https://i.postimg.cc/5t5QKf8B/Screenshot-20260629-070950-Chrome.png")

        // الفوتر + الصورة الصغيرة (شمال تحت)
        .setFooter({
            text: "نتمني لك وقتا رائعا معنا | Shenzoe Community ",
            iconURL: "https://i.postimg.cc/N0vrxK9p/IMG-20260629-WA0009.png"
        })

        .setTimestamp();

    const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId("rules_button")
            .setLabel("📖 قراءة القوانين")
            .setStyle(ButtonStyle.Secondary)
    );

    channel.send({
        content: `${member}`,
        embeds: [embed],
        components: [row]
    });

});

// ===========================
// زر القوانين
// ===========================

client.on("interactionCreate", async (interaction) => {

    if (!interaction.isButton()) return;

    if (interaction.customId === "rules_button") {

        await interaction.reply({
            content: `📜 توجه إلى روم القوانين: <#${RULES_CHANNEL_ID}>`,
            ephemeral: true
        });

    }

});

// ===========================
// تشغيل البوت
// ===========================

client.login(process.env.TOKEN);