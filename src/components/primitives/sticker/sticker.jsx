import React from "react";
import { Image } from "../image/image";
import cinqueEMezzoAudio from "../../../media/audio/5.ogg";
import acquistoAudio from "../../../media/audio/acquisto.ogg";
import cadavereAudio from "../../../media/audio/cadavere.ogg";
import cagareAudio from "../../../media/audio/cagare.ogg";
import caneAudio from "../../../media/audio/cane.ogg";
import devastanteAudio from "../../../media/audio/devastante.ogg";
import dioAudio from "../../../media/audio/dio.ogg";
import eccoAudio from "../../../media/audio/ecco.ogg";
import elementariAudio from "../../../media/audio/elementari.ogg";
import impazzitoAudio from "../../../media/audio/impazzito.ogg";
import incredibileAudio from "../../../media/audio/incredibile.ogg";
import ingiustoAudio from "../../../media/audio/ingiusto.ogg";
import jAudio from "../../../media/audio/j.ogg";
import madreAudio from "../../../media/audio/madre.ogg";
import mancosuAudio from "../../../media/audio/mancosu.ogg";
import onestoAudio from "../../../media/audio/onesto.ogg";
import pazziAudio from "../../../media/audio/pazzi.ogg";
import peresAudio from "../../../media/audio/peres.ogg";
import pogbaAudio from "../../../media/audio/pogba.ogg";
import porcaAudio from "../../../media/audio/porca.ogg";
import sennoAudio from "../../../media/audio/senno.ogg";
import veramenteAudio from "../../../media/audio/veramente.ogg";
import { percentage } from "../../../utils/numbers";

export const Sticker = ({ width, player, user, amount, settings, play }: Props) => {
  const generateSticker = () => {
    let info = {
      sticker: "acquisto.png",
      audio: new Audio(acquistoAudio),
    };

    // Set sticker
    if (player.owned !== "") {
      if (player.name.includes("Aouar")) {
        info = {
          sticker: "carles.png",
          audio: new Audio(peresAudio),
        };
      } else if (
        player.name.includes("Rovella") ||
        player.name.includes("Alex Sandro") ||
        player.name.includes("Arthur") ||
        player.name.includes("Rabiot") ||
        player.name.includes("Rugani") ||
        player.name.includes("De Sciglio") ||
        player.name.includes("Frabotta")
      ) {
        info = {
          sticker: "madre.png",
          audio: new Audio(madreAudio),
        };
      } else if (player.name.includes("Kovalenko") || player.name.includes("mancosu")) {
        info = {
          sticker: "mancosu.png",
          audio: new Audio(mancosuAudio),
        };
      } else if (player.name.includes("Gagliardini")) {
        info = {
          sticker: "cadavere.png",
          audio: new Audio(cadavereAudio),
        };
      } else if (player.name.includes("Caldirola")) {
        info = {
          sticker: "elementari.png",
          audio: new Audio(elementariAudio),
        };
      } else if (player.name.includes("Cristante")) {
        info = {
          sticker: "cagare.png",
          audio: new Audio(cagareAudio),
        };
      } else if (player.name.includes("Pogba")) {
        info = {
          sticker: "pogba.png",
          audio: new Audio(pogbaAudio),
        };
      } else if (
        player.name.includes("Pasalic") ||
        player.name.includes("Belotti") ||
        player.name.includes("Mancini") ||
        player.name.includes("Soriano") ||
        player.name.includes("Di Francesco")
      ) {
        info = {
          sticker: "5.png",
          audio: new Audio(cinqueEMezzoAudio),
        };
      } else if (
        (player.name.includes("Caprari") ||
          player.name.includes("Mario Rui") ||
          player.name.includes("Nzola") ||
          player.name.includes("Demme") ||
          player.name.includes("Lobotka") ||
          player.name.includes("Calhanoglu") ||
          player.name.includes("Bonucci") ||
          player.name.includes("Romagnoli")) &&
        user.username.toLowerCase() !== "tia" &&
        user.username.toLowerCase().includes() !== "mattia" &&
        user.username.toLowerCase() !== "punta" &&
        user.username.toLowerCase().includes() !== "puntarello"
      ) {
        info = {
          sticker: "ingiusto.png",
          audio: new Audio(ingiustoAudio),
        };
      } else if (
        percentage(player.owned_amount, settings.budget) >= 7.5 &&
        percentage(player.owned_amount, settings.budget) < 10 &&
        player.quot_m < 23 &&
        player.role_classic !== "P"
      ) {
        info = {
          sticker: "pazzi.png",
          audio: new Audio(pazziAudio),
        };
      } else if (percentage(player.owned_amount, settings.budget) >= 31) {
        info = {
          sticker: "devastante.png",
          audio: new Audio(devastanteAudio),
        };
      } else if (percentage(player.owned_amount, settings.budget) >= 23) {
        info = {
          sticker: "incredibile.png",
          audio: new Audio(incredibileAudio),
        };
      } else if (
        (player.team.toLowerCase() === "frosinone" ||
          player.team.toLowerCase() === "empoli" ||
          player.team.toLowerCase() === "verona" ||
          player.team.toLowerCase() === "lecce") &&
          percentage(player.owned_amount, settings.budget) < 1 &&
        player.quot_m < 15
      ) {
        info = {
          sticker: "cadavere.png",
          audio: new Audio(cadavereAudio),
        };
      } else if (
        (player.team.toLowerCase() === "frosinone" ||
        player.team.toLowerCase() === "empoli" ||
        player.team.toLowerCase() === "verona" ||
        player.team.toLowerCase() === "lecce") &&
        percentage(player.owned_amount, settings.budget) >= 1 &&
        player.quot_m < 15
      ) {
        info = {
          sticker: "cagare.png",
          audio: new Audio(cagareAudio),
        };
      } else if (
        (player.owned_amount < parseInt(player.quot_m) * 1.5 &&
          player.quot_m >= 23) ||
        (player.role_classic === "A" &&
          player.quot_m >= 20 &&
          player.owned_amount < parseInt(player.quot_m) * 3)
      ) {
        info = {
          sticker: "acquisto.png",
          audio: new Audio(acquistoAudio),
        };
      } else if (
        (player.owned_amount < parseInt(player.quot_m) * 2 &&
          player.quot_m >= 23) ||
        (player.role_classic === "A" &&
          player.quot_m >= 20 &&
          player.owned_amount < parseInt(player.quot_m) * 4)
      ) {
        info = {
          sticker: "onesto.png",
          audio: new Audio(onestoAudio),
        };
      } else if (
        parseInt(player.quot_m) < 5 &&
        player.role_classic !== "P" &&
        (player.team.toLowerCase() === "bologna" ||
          player.team.toLowerCase() === "cagliari" ||
          player.team.toLowerCase() === "genoa" ||
          player.team.toLowerCase() === "verona")
      ) {
        info = {
          sticker: "j.png",
          audio: new Audio(jAudio),
        };
      } else if (
        parseInt(player.quot_m) < 5 &&
        player.role_classic !== "P" &&
        player.owned_amount > 1
      ) {
        info = {
          sticker: "veramente.png",
          audio: new Audio(veramenteAudio),
        };
      } else if (
        parseInt(player.quot_m) < 4 &&
        player.role_classic === "P" &&
        player.owned_amount > 1
      ) {
        info = {
          sticker: "ingiusto.png",
          audio: new Audio(ingiustoAudio),
        };
      } else if (
        parseInt(player.quot_m) >= 15 &&
        player.role_classic === "P" &&
        percentage(player.owned_amount, settings.budget) <= 6
      ) {
        info = {
          sticker: "acquisto.png",
          audio: new Audio(ingiustoAudio),
        };
      } else if (
        parseInt(player.quot_m) >= 15 &&
        player.role_classic === "P" &&
        percentage(player.owned_amount, settings.budget) <= 9
      ) {
        info = {
          sticker: "onesto.png",
          audio: new Audio(onestoAudio),
        };
      } else if (
        parseInt(player.quot_m) > 12 &&
        player.role_classic === "P" &&
        percentage(player.owned_amount, settings.budget) > 5
      ) {
        info = {
          sticker: "senno.png",
          audio: new Audio(sennoAudio),
        };
      } else if (player.owned_amount >= parseInt(player.quot_m) * 3) {
        info = {
          sticker: "dio.png",
          audio: new Audio(dioAudio),
        };
      } else if (player.owned_amount >= parseInt(player.quot_m) * 2.8) {
        info = {
          sticker: "impazzito.png",
          audio: new Audio(impazzitoAudio),
        };
      } else if (player.owned_amount >= parseInt(player.quot_m) * 2.4) {
        info = {
          sticker: "cane.png",
          audio: new Audio(caneAudio),
        };
      } else if (player.owned_amount >= parseInt(player.quot_m) * 2.1) {
        info = {
          sticker: "ecco.png",
          audio: new Audio(eccoAudio),
        }
      } else if (player.owned_amount >= parseInt(player.quot_m) * 1.8) {
        info = {
          sticker: "porca.png",
          audio: new Audio(porcaAudio),
        };
      } else if (player.owned_amount >= parseInt(player.quot_m) * 1.4) {
        info = {
          sticker: "senno.png",
          audio: new Audio(sennoAudio),
        };
      } else if (player.owned_amount > parseInt(player.quot_m)) {
        info = {
          sticker: "onesto.png",
          audio: new Audio(onestoAudio),
        };
      }
    }

    return info;
  };

  const { sticker, audio } = generateSticker();

  if (play) {
    audio.play();
  }

  return <Image src={`/media/stickers/${sticker}`} width={width} />;
};
