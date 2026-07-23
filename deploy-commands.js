require("dotenv").config();

const { REST, Routes, SlashCommandBuilder } = require("discord.js");

const commands = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),

  new SlashCommandBuilder()
    .setName("join")
    .setDescription("Join your current voice channel"),

  new SlashCommandBuilder()
    .setName("leave")
    .setDescription("Leave the current voice channel"),
].map(command => command.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Registering slash commands...");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log("✅ Slash commands registered.");
  } catch (error) {
    console.error(error);
  }
})();
