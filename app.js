const Discord = require('discord.js');
const https = require('https');
const client = new Discord.Client();
const axios = require('axios');
var compris =false;

client.on('ready', () => {
	console.log('I am ready!');
});
client.on('message', message => {
if(message.mentions.users.has(client.user.id))
{
	message.reply("salut :) je suis la");
}	

if (message.channel.type=="dm" && message.author.bot==false ) {

	
if (message.content === 'ping') {
	
message.reply('pong');
}



else if (message.content.search("!blague") != -1) {
			
			axios.get('http://www.chucknorrisfacts.fr/api/get?data=tri:alea;nb=1').then(function(response){
				message.reply(response.data[0].fact);
			}).catch(console.log); 
			
		}
		
else if(message.content.search("!meteo")!=-1)
{
	var z=message.content.search("!meteo");
	var x="!meteo".length;

	var ville=message.content.substring(z+x,message.content.length)
	
	axios.get('http://api.openweathermap.org/data/2.5/weather?q='+ville+' &appid=a4b7c2bbdb83d7e413ec09dd4a653791').then(function(response){
				message.reply(response.data.weather[0].description);
			}).catch(console.log); 
			
}		
else if(message.content.search("!image")!=-1)
{
var z=message.content.search("!image");
var x="!image".length;

var titre_image=message.content.substring(z+x,message.content.length)
var path_p='/3/gallery/search/time/1/?q=';
var path_o=path_p+titre_image;
var options = {
  hostname: 'api.imgur.com',
  path: path_p,
  headers: {'Authorization': 'Client-ID 4a23c71db2902ae'},
  method: 'GET'
};
data=""

 
var req = https.request(options, function(res) {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);
    console.log('data:', res.data)

  res.on('data', function(d) {
    data+=d
    
  });
  res.on("end", function () {
    re=JSON.parse(data)
        message.reply(re['data'][0]["link"]);
    });
});
	
req.on('error', function(e) {
  console.error(e);
});

req.end();	
}	
else message.reply("Bonjour , désolé j'ai rien compris");


}
 

console.log(message);
});

client.on('presenceUpdate', function(oldMember, newMember) {
console.log(oldMember.presence, '=>', newMember.presence);
if(newMember.user.username=="bramas" && newMember.presence.status=="online")
{
newMember.user.sendMessage("Bonjour maitre, je suis le bot de ouali, que puis-je faire pour vous aujourdhui ?");
}

}


);

compris=false;	
		
client.login(process.env.DISCORD_TOKEN);




var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(process.env.PORT || 3000);
