# sdvx-ecloud-data-scraping

- This tool is scraping for music data by SOUND VOLTEX EXCEED GEAR.

## Usage

```zsh
% yarn install
% yarn build
```

## Output Example JSON

```jsonc
{
  "baseUrl": "https://p.eagate.573.jp",
  "lastUpdated": "2023/3/20 22:52:45",
  "type": "eacloud",
  "data": [
    {
      "title": "I Left for my Right",
      "artist": "あの日字数制限に負けて追い出された「ゃ」",
      "pack": "コナステ版 SOUND VOLTEX 楽曲パック vol.19",
      "tags": [
        "FLOOR"
      ],
      "details": [
        {
          "level": 5,
          "difficulty": "NOV",
          "jacket": "/game/sdvx/vi/common/jacket.html?img=O3N0ghaOPAMvvWIh0JX1Mg"
        },
        {
          "level": 12,
          "difficulty": "ADV",
          "jacket": "/game/sdvx/vi/common/jacket.html?img=5rzObSJGscIPrEjJMsa5Sg"
        },
        {
          "level": 15,
          "difficulty": "EXH",
          "jacket": "/game/sdvx/vi/common/jacket.html?img=4c-yKCRX2zvXbJjTNTG1nw"
        },
        {
          "level": 17,
          "difficulty": "MXM",
          "jacket": "/game/sdvx/vi/common/jacket.html?img=S7WzaP0jXDVDInIMJfn-sA"
        }
      ]
    },
    {
      "title": "Avalanx",
      "artist": "隣の庭は青い(庭師+Aoi)",
      "pack": "コナステ版 SOUND VOLTEX 楽曲パック vol.19",
      "tags": [
        "SDVXオリジナル"
      ],
      "details": [
        {
          "level": 7,
          "difficulty": "NOV",
          "jacket": "/game/sdvx/vi/common/jacket.html?img=nEnBmww1AHTyM715Qmz80Q"
        },
        {
          "level": 14,
          "difficulty": "ADV",
          "jacket": "/game/sdvx/vi/common/jacket.html?img=3VWbc3B6Re8jZGA7xFiu-w"
        },
        {
          "level": 17,
          "difficulty": "EXH",
          "jacket": "/game/sdvx/vi/common/jacket.html?img=ta4xsTojJYls0xGVJSbA9Q"
        },
        {
          "level": 19,
          "difficulty": "MXM",
          "jacket": "/game/sdvx/vi/common/jacket.html?img=T-cjgkrMf3xOfwEGizaGrg"
        }
      ]
    },
    {
      "title": "Across the Starlight",
      "artist": "かゆき",
      "pack": "コナステ版 SOUND VOLTEX 楽曲パック vol.19",
      "tags": [
        "FLOOR"
      ],
      "details": [
        {
          "level": 6,
          "difficulty": "NOV",
          "jacket": "/game/sdvx/vi/common/jacket.html?img=1rkYWbmbwZDQsoX3wAy4dQ"
        },
        {
          "level": 13,
          "difficulty": "ADV",
          "jacket": "/game/sdvx/vi/common/jacket.html?img=Mkc7cP2-aSocaym-ZOIKOQ"
        },
        {
          "level": 16,
          "difficulty": "EXH",
          "jacket": "/game/sdvx/vi/common/jacket.html?img=zfYmKwYWmALjDVbqiVQSug"
        },
        {
          "level": 18,
          "difficulty": "MXM",
          "jacket": "/game/sdvx/vi/common/jacket.html?img=lAw4OY0gnkg_wMMGaV_niA"
        }
      ]
    },
    {
      // ...
    }
```
