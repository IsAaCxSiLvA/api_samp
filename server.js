const express = require('express');
const Query = require("best-samp-query");
const fs = require("fs");

const app = express();

// 🔥 Libera o JSON na web
app.use(express.static(__dirname));

const SERVER_IP = "191.96.224.79";
const SERVER_PORT = 7897;

// Função que atualiza o JSON
async function atualizarServidor() {
  try {
    const data = await Query({
      host: SERVER_IP,
      port: SERVER_PORT,
      timeout: 5000
    });

    // Formato correto que o APK espera
    const jsonData = {
      query: [
        {
          number: 1,
          name: data.hostname,
          ip: data.address,
          port: data.port,
          online: data.online,
          maxplayers: data.maxplayers,
          password: data.passworded || false
        }
      ]
    };

    fs.writeFileSync("servidores.json", JSON.stringify(jsonData, null, 2));

    console.log("JSON atualizado 🔥");

  } catch (err) {

    const offlineData = {
      query: [
        {
          number: 1,
          name: "Gold City Roleplay",
          ip: SERVER_IP,
          port: SERVER_PORT,
          online: 0,
          maxplayers: 0,
          password: false
        }
      ]
    };

    fs.writeFileSync("servidores.json", JSON.stringify(offlineData, null, 2));

    console.log("Servidor offline ❌");
  }
}

// Atualiza a cada 30 segundos
setInterval(atualizarServidor, 30000);

// Atualiza quando inicia
atualizarServidor();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT} 🔥`);
});