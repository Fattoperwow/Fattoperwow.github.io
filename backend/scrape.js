import fetch from "node-fetch";
import * as cheerio from "cheerio";
import express from "express";

const app = express();

app.get("/api/scrape", async (req, res) => {
  // Perform scraping logic here
  // Send back the scraped data as a response
  const playerId = req.query.id;
  const playerSlug = req.query.slug;
  const season = req.query.season;
  const role = req.query.role;
  const team = req.query.team;
  const fetchOldSeason = req.query.season;
  let data = {};
  let seasonData = {};
  setTimeout(async () => {
    const url = `https://www.fantacalcio.it/serie-a/squadre/${team}/${playerSlug}/${playerId}`;
    data = await scrapeFullData(url, role);
    const seasonurl = `https://www.fantacalcio.it/serie-a/squadre/${team}/${playerSlug}/${playerId}/2022-23`;
    seasonData = await scrapeSeasonData(seasonurl, role);

    data.stats["2022-23"] = seasonData;
    res.json(data);
  }, 2000);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const scrapeFullData = async (url, role) => {
  const page = await fetch(url);
  const data = await page.text();
  const $ = cheerio.load(data);

  const playerData = {
    name: $("h1.player-name").text().trim(),
    height: $("[itemprop=height]").text().trim(),
    birth_date: $(".player-data")
      .children()
      .eq(1)
      .children()
      .eq(1)
      .text()
      .trim(),
    main_feet: $(".player-data")
      .children()
      .eq(2)
      .children()
      .eq(1)
      .text()
      .trim(),
    nationality: $(".player-data")
      .children()
      .eq(3)
      .children()
      .eq(1)
      .text()
      .trim(),

    quot_c: $('[title="Quotazione classic"]').children().eq(0).text(),
    quot_m: $('[title="Quotazione Mantra"]').children().eq(0).text(),
    stats: {
      "2023-24": {
        mv: $('[title="Media Voto"]').children().eq(0).text(),
        mfv: $('[title="Fantamedia"]').children().eq(0).text(),
        played_matches: parseInt(
          $(".large-stats > tbody").children().eq(0).children().eq(1).text()
        ),
        goals:
          role === "P"
            ? 0
            : parseInt(
                $(".large-stats > tbody")
                  .children()
                  .eq(1)
                  .children()
                  .eq(1)
                  .text()
              ),
        goals_received:
          role === "P"
            ? parseInt(
                $(".large-stats > tbody")
                  .children()
                  .eq(1)
                  .children()
                  .eq(1)
                  .text()
              )
            : 0,
        assists: parseInt(
          $(".large-stats > tbody").children().eq(2).children().eq(1).text()
        ),
        home_goals:
          role === "P"
            ? 0
            : parseInt(
                $(".small-stats > tbody")
                  .children()
                  .eq(0)
                  .children()
                  .eq(1)
                  .children()
                  .eq(0)
                  .text()
                  .split("/")[0]
              ),
        away_goals:
          role === "P"
            ? 0
            : parseInt(
                $(".small-stats > tbody")
                  .children()
                  .eq(0)
                  .children()
                  .eq(1)
                  .children()
                  .eq(0)
                  .text()
                  .split("/")[1]
              ),
        home_goals_received:
          role === "P"
            ? parseInt(
                $(".small-stats > tbody")
                  .children()
                  .eq(0)
                  .children()
                  .eq(1)
                  .children()
                  .eq(0)
                  .text()
                  .split("/")[0]
              )
            : 0,
        away_goals_received:
          role === "P"
            ? parseInt(
                $(".small-stats > tbody")
                  .children()
                  .eq(0)
                  .children()
                  .eq(1)
                  .children()
                  .eq(0)
                  .text()
                  .split("/")[1]
              )
            : 0,

        attempted_penatlies:
          role === "P"
            ? 0
            : parseInt(
                $(".small-stats > tbody")
                  .children()
                  .eq(2)
                  .children()
                  .eq(1)
                  .children()
                  .eq(0)
                  .text()
                  .split("/")[1]
              ),

        penalties:
          role === "P"
            ? 0
            : parseInt(
                $(".small-stats > tbody")
                  .children()
                  .eq(2)
                  .children()
                  .eq(1)
                  .children()
                  .eq(0)
                  .text()
                  .split("/")[0]
              ),
        saved_penalties:
          role === "P"
            ? parseInt(
                $(".small-stats > tbody")
                  .children()
                  .eq(2)
                  .children()
                  .eq(1)
                  .children()
                  .eq(0)
                  .text()
              )
            : 0,
        own_goals: parseInt(
          $(".small-stats > tbody")
            .children()
            .eq(4)
            .children()
            .eq(1)
            .children()
            .eq(0)
            .text()
        ),
        yellow_cards: parseInt(
          $(".small-stats > tbody")
            .children()
            .eq(1)
            .children()
            .eq(1)
            .children()
            .eq(0)
            .text()
        ),
        red_cards: parseInt(
          $(".small-stats > tbody")
            .children()
            .eq(3)
            .children()
            .eq(1)
            .children()
            .eq(0)
            .text()
        ),
        matches_in_lineups: parseInt(
          $(".donut-summary")
            .children()
            .eq(0)
            .children("span")
            .children()
            .eq(1)
            .children()
            .eq(0)
            .text()
            .split(" - ")[0]
        ),
        matches_entered_late: parseInt(
          $(".donut-summary")
            .children()
            .eq(1)
            .children("span")
            .children()
            .eq(1)
            .children()
            .eq(0)
            .text()
            .split(" - ")[0]
        ),
        matches_disqualified: parseInt(
          $(".donut-summary")
            .children()
            .eq(2)
            .children("span")
            .children()
            .eq(1)
            .children()
            .eq(0)
            .text()
            .split(" - ")[0]
        ),
        matches_injured: parseInt(
          $(".donut-summary")
            .children()
            .eq(3)
            .children("span")
            .children()
            .eq(1)
            .children()
            .eq(0)
            .text()
            .split(" - ")[0]
        ),
        matches_unused: parseInt(
          $(".donut-summary")
            .children()
            .eq(4)
            .children("span")
            .children()
            .eq(1)
            .children()
            .eq(0)
            .text()
            .split(" - ")[0]
        ),
      },
    },
  };
  return playerData;
};

const scrapeSeasonData = async (url, role) => {
  const page = await fetch(url);
  const data = await page.text();
  const $ = cheerio.load(data);
  const seasonData = {
    mv: $('[title="Media Voto"]').children().eq(0).text(),
    mfv: $('[title="Fantamedia"]').children().eq(0).text(),
    played_matches: parseInt(
      $(".large-stats > tbody").children().eq(0).children().eq(1).text()
    ),
    goals:
      role === "P"
        ? 0
        : parseInt(
            $(".large-stats > tbody").children().eq(1).children().eq(1).text()
          ),
    goals_received:
      role === "P"
        ? parseInt(
            $(".large-stats > tbody").children().eq(1).children().eq(1).text()
          )
        : 0,
    assists: parseInt(
      $(".large-stats > tbody").children().eq(2).children().eq(1).text()
    ),
    home_goals:
      role === "P"
        ? 0
        : parseInt(
            $(".small-stats > tbody")
              .children()
              .eq(0)
              .children()
              .eq(1)
              .children()
              .eq(0)
              .text()
              .split("/")[0]
          ),
    away_goals:
      role === "P"
        ? 0
        : parseInt(
            $(".small-stats > tbody")
              .children()
              .eq(0)
              .children()
              .eq(1)
              .children()
              .eq(0)
              .text()
              .split("/")[1]
          ),
    home_goals_received:
      role === "P"
        ? parseInt(
            $(".small-stats > tbody")
              .children()
              .eq(0)
              .children()
              .eq(1)
              .children()
              .eq(0)
              .text()
              .split("/")[0]
          )
        : 0,
    away_goals_received:
      role === "P"
        ? parseInt(
            $(".small-stats > tbody")
              .children()
              .eq(0)
              .children()
              .eq(1)
              .children()
              .eq(0)
              .text()
              .split("/")[1]
          )
        : 0,

    attempted_penatlies:
      role === "P"
        ? 0
        : parseInt(
            $(".small-stats > tbody")
              .children()
              .eq(2)
              .children()
              .eq(1)
              .children()
              .eq(0)
              .text()
              .split("/")[1]
          ),

    penalties:
      role === "P"
        ? 0
        : parseInt(
            $(".small-stats > tbody")
              .children()
              .eq(2)
              .children()
              .eq(1)
              .children()
              .eq(0)
              .text()
              .split("/")[0]
          ),
    saved_penalties:
      role === "P"
        ? parseInt(
            $(".small-stats > tbody")
              .children()
              .eq(2)
              .children()
              .eq(1)
              .children()
              .eq(0)
              .text()
          )
        : 0,
    own_goals: parseInt(
      $(".small-stats > tbody")
        .children()
        .eq(4)
        .children()
        .eq(1)
        .children()
        .eq(0)
        .text()
    ),
    yellow_cards: parseInt(
      $(".small-stats > tbody")
        .children()
        .eq(1)
        .children()
        .eq(1)
        .children()
        .eq(0)
        .text()
    ),
    red_cards: parseInt(
      $(".small-stats > tbody")
        .children()
        .eq(3)
        .children()
        .eq(1)
        .children()
        .eq(0)
        .text()
    ),
    matches_in_lineups: parseInt(
      $(".donut-summary")
        .children()
        .eq(0)
        .children("span")
        .children()
        .eq(1)
        .children()
        .eq(0)
        .text()
        .split(" - ")[0]
    ),
    matches_entered_late: parseInt(
      $(".donut-summary")
        .children()
        .eq(1)
        .children("span")
        .children()
        .eq(1)
        .children()
        .eq(0)
        .text()
        .split(" - ")[0]
    ),
    matches_disqualified: parseInt(
      $(".donut-summary")
        .children()
        .eq(2)
        .children("span")
        .children()
        .eq(1)
        .children()
        .eq(0)
        .text()
        .split(" - ")[0]
    ),
    matches_injured: parseInt(
      $(".donut-summary")
        .children()
        .eq(3)
        .children("span")
        .children()
        .eq(1)
        .children()
        .eq(0)
        .text()
        .split(" - ")[0]
    ),
    matches_unused: parseInt(
      $(".donut-summary")
        .children()
        .eq(4)
        .children("span")
        .children()
        .eq(1)
        .children()
        .eq(0)
        .text()
        .split(" - ")[0]
    ),
  };

  return seasonData;
};
