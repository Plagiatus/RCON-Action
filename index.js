const core = require("@actions/core");
const github = require( "@actions/github");
const rcon = require( "./node-rcon/RCON.js" );

run()
async function run() {
	console.log("❤ thank you for using RCON-Action (https://github.com/Plagiatus/RCON-Action).");
	console.log("⭐ if you find this helpful, why not drop a star on the repo? Much appreciated!");
	console.log("❓ if you have any questions or issues, please let us know by writing an issue");


	try {
		const inputs = {
			server: core.getInput("server"),
			port: core.getInput("port"),
			password: core.getInput("password"),
			commands: core.getInput("commands"),
			sendPushInfo: core.getInput("send-push-info"),
			pushInfoRecipient: core.getInput("push-info-recipient"),
		}
		const payload = JSON.stringify(github.context.payload, undefined, 2);

		console.log(inputs);
		console.log(payload);

		const srvr = new rcon();
		console.log("Connecting to server via RCON...");
		await srvr.connect(inputs.server, inputs.port, inputs.password)
		console.log("🟢 connected and authenticated");

		if (inputs.sendPushInfo) {
			await srvr.send(`tellraw ${inputs.pushInfoRecipient} [{"text":"[GitHub] New push from ","color":"#6D0599"},{"text":"${github.context.payload.sender.login}","color":"#330080"},{"text":" detected and added to the server via ftp."}]`)
		}
		if (inputs.commands.length > 0) {
			for (let command of inputs.commands) {
				await srvr.send(command);
			}
			console.log(`📬 Sent all ${inputs.commands.length} to the server.`)
		}

		srvr.end();
	} catch (error) {
		core.setFailed(error.message)
	}
}