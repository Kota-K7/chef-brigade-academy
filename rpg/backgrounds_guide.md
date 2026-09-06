# 共有背景画像カタログ & 指定ガイド (RPG Backgrounds Reference)

このドキュメントは、歴史体験RPG（History）および修業ストーリー（Story）で使用できる**共有背景画像**の一覧と指定ルールです。
すべての背景画像は `assets/story/backgrounds/` に集約されており、各エピソードの `backgrounds` 定義から参照します。

---

## 1. シナリオ作成時の指定方法

### A. 下書き時
下書きでは以下のように日本語名またはキー名を指定します：
```text
背景: 厨房
背景: 森
背景: 部屋
背景: 黒
```

### B. JSON 内の `backgrounds` オブジェクト記述例
```json
"backgrounds": {
  "bgBlack": "#000000",
  "forest": "url('assets/story/backgrounds/forest.webp')",
  "kitchen": "url('assets/story/backgrounds/kitchen.webp')",
  "castle": "url('assets/story/backgrounds/castle.webp')"
}
```

---

## 2. 共有背景一覧テーブル

| キー (ID) | 背景名称 | カテゴリ | ファイルパス | 説明・主な用途 |
| :--- | :--- | :--- | :--- | :--- |
| **`alesia_siege`** | アレシア包囲戦 | 軍事・戦場 | `assets/story/backgrounds/alesia_siege.webp` | 二重の包囲陣が築かれた歴史的決戦場アレシア。 |
| **`alesia_surrender`** | ウェルキンゲトリクス降伏 | 軍事・戦場 | `assets/story/backgrounds/alesia_surrender.webp` | カエサルの前で馬を下り武器を投じる名場面。 |
| **`assembly`** | 朝の集会 / 朝礼 | 軍事・戦場 | `assets/story/backgrounds/assembly.webp` | 兵士たちが整列して指示を受ける集会広場。 |
| **`avaricum_siege`** | アウァーリクム包囲戦 | 軍事・戦場 | `assets/story/backgrounds/avaricum_siege.webp` | 城壁を取り囲む包囲戦の緊迫した戦況。 |
| **`battle_arab`** | トゥール・ポワティエ間の戦い | 軍事・戦場 | `assets/story/backgrounds/battle_arab.webp` | シャルル・マルテルがウマイヤ朝軍を迎え撃つ決戦場。 |
| **`battlefield_gaul`** | 戦場 (ガリア戦役) | 軍事・戦場 | `assets/story/backgrounds/battlefield_gaul.webp` | カエサル軍とガリア諸部族が激突する古代の合戦場。 |
| **`battlefield_merov`** | 戦場 (フランク王国・中世) | 軍事・戦場 | `assets/story/backgrounds/battlefield_merov.webp` | フランク王国時代の激闘の戦場。 |
| **`camp_morning`** | 軍野営地 (朝) | 軍事・戦場 | `assets/story/backgrounds/camp_morning.webp` | 朝陽が差し込む軍団のテント群・野営地。 |
| **`camp_night`** | 軍野営地 (夜) | 軍事・戦場 | `assets/story/backgrounds/camp_night.webp` | 篝火が灯る夜の軍野営地。 |
| **`charlemagne_battlefield`** | カール大帝の戦場 | 軍事・戦場 | `assets/story/backgrounds/charlemagne_battlefield.webp` | ザクセンやランゴバルドとの戦いに臨むカール大帝の軍勢。 |
| **`gaul_camp`** | ガリア軍陣営 | 軍事・戦場 | `assets/story/backgrounds/gaul_camp.webp` | ガリア戦士たちの幕営地。 |
| **`vercingetorix_camp`** | ウェルキンゲトリクスの陣営 | 軍事・戦場 | `assets/story/backgrounds/vercingetorix_camp.webp` | ガリア連合軍の指揮幕舎・篝火の陣地。 |
| **`bg_restaurant`** | レストラン外観・店舗 | 日常・店舗 | `assets/story/backgrounds/bg_restaurant.webp` | クラシックなフレンチレストランの外観・店先。 |
| **`bg_room`** | 部屋 / 宿屋 | 日常・店舗 | `assets/story/backgrounds/bg_room.webp` | 主人公の自室や宿屋の部屋。朝の起床シーンや日常の会話に使用。 |
| **`gael_sweets`** | ガエルのスイーツ工房 | 日常・店舗 | `assets/story/backgrounds/gael_sweets.webp` | パティシエ・ガエルのお菓子工房・デザートセクション。 |
| **`kanetake_night`** | 夜の厨房・店先 | 日常・店舗 | `assets/story/backgrounds/kanetake_night.webp` | 夜間・営業終了後の静まり返った厨房・店舗。 |
| **`kitchen`** | 厨房 / 調理場 | 日常・店舗 | `assets/story/backgrounds/kitchen.webp` | 本格的なレストランの厨房。調理やシェフたちの仕込み・バトルの舞台。 |
| **`restaurant`** | レストラン店内 | 日常・店舗 | `assets/story/backgrounds/restaurant.webp` | 星付きレストランのダイニングホール。食事シーンやホールでの会話に使用。 |
| **`bg_after_battle`** | 勝利・戦い後の広場 | イベント演出 | `assets/story/backgrounds/bg_after_battle.webp` | 戦いが終わり達成感を分かち合うシーン。 |
| **`bg_camille_cry`** | カミーユの涙 | イベント演出 | `assets/story/backgrounds/bg_camille_cry.webp` | 悔しさや悲しみに暮れるカミーユのイベントCG背景。 |
| **`bg_container_thief`** | コンテナに潜む泥棒 | イベント演出 | `assets/story/backgrounds/bg_container_thief.webp` | コンテナの陰で食材を奪おうとする泥棒の影。 |
| **`bg_father`** | 父の背中 | イベント演出 | `assets/story/backgrounds/bg_father.webp` | 父の堂々とした後ろ姿。 |
| **`bg_thief_caught`** | 泥棒捕縛 | イベント演出 | `assets/story/backgrounds/bg_thief_caught.webp` | 泥棒を取り押さえた解決シーン。 |
| **`capet_dynasty`** | カペー朝の創始 | 歴史・地図・絵画 | `assets/story/backgrounds/capet_dynasty.jpg` | ユーグ・カペーによるカペー朝の幕開け絵画。 |
| **`clovis_death`** | クローヴィスの死 | 歴史・地図・絵画 | `assets/story/backgrounds/clovis_death.webp` | メロヴィング朝創始者クローヴィスの最期。 |
| **`clovis_oath`** | クローヴィスの誓い | 歴史・地図・絵画 | `assets/story/backgrounds/clovis_oath.webp` | キリスト教改宗を決意し神に祈るクローヴィス1世。 |
| **`flashback`** | 回想シーン | 歴史・地図・絵画 | `assets/story/backgrounds/flashback.webp` | 過去の出来事や記憶を振り返る演出背景。 |
| **`grin`** | にやり (心理描写) | 歴史・地図・絵画 | `assets/story/backgrounds/grin.webp` | 策謀や企みを表現する心理カット。 |
| **`letter`** | 手紙 / 書簡 | 歴史・地図・絵画 | `assets/story/backgrounds/letter.webp` | 羊皮紙に書かれた重要な親書・手紙。 |
| **`map_8th_century`** | 8世紀ヨーロッパ勢力図 | 歴史・地図・絵画 | `assets/story/backgrounds/map_8th_century.webp` | フランク王国やイスラム勢力の拡大を示す8世紀の地図。 |
| **`martel_awakening`** | マルテル覚醒 | 歴史・地図・絵画 | `assets/story/backgrounds/martel_awakening.webp` | 鉄鎚（マルテル）の異名を持つ宮相シャルルの覚醒。 |
| **`mersen_verdun`** | ヴェルダン・メルセン条約 | 歴史・地図・絵画 | `assets/story/backgrounds/mersen_verdun.jpg` | フランク王国の3分割条約（フランス・ドイツ・イタリアの原型）。 |
| **`normandy_conquest`** | ノルマン・コンクエスト | 歴史・地図・絵画 | `assets/story/backgrounds/normandy_conquest.jpg` | 1066年ノルマンディー公ウィリアムのイングランド征服。 |
| **`pepin_donation`** | ピピンの寄進 | 歴史・地図・絵画 | `assets/story/backgrounds/pepin_donation.webp` | ピピン3世が教皇に領地を寄進し教皇領が成立する場面。 |
| **`rollo_raid`** | ロロ襲来 (ヴァイキング) | 歴史・地図・絵画 | `assets/story/backgrounds/rollo_raid.jpg` | セーヌ川を遡上して侵攻するヴァイキング首領ロロ。 |
| **`roma_empire_map`** | 古代ローマ帝国地図 | 歴史・地図・絵画 | `assets/story/backgrounds/roma_empire_map.webp` | 地中海を囲むローマ帝国の版図を示す古地図。 |
| **`white_mic`** | 白マイク | 歴史・地図・絵画 | `assets/story/backgrounds/white_mic.jpg` | 解説・ナレーションの演出画像。 |
| **`forest`** | 森 / 森林 | 自然・集落 | `assets/story/backgrounds/forest.webp` | 緑豊かなヨーロッパの森林。行軍や潜伏、探索シーンに使用。 |
| **`garden`** | 庭園 | 自然・集落 | `assets/story/backgrounds/garden.webp` | 美しい樹木と花が咲く庭園。 |
| **`gergovia_mountain`** | ゲルゴウィアの山 | 自然・集落 | `assets/story/backgrounds/gergovia_mountain.webp` | 険しい岩山と要塞の遠景。ガリアの堅牢な拠点。 |
| **`village`** | 村 / 集落 | 自然・集落 | `assets/story/backgrounds/village.webp` | 古代〜中世の素朴な村・民家群。 |
| **`village_empty`** | もぬけの殻の村 | 自然・集落 | `assets/story/backgrounds/village_empty.webp` | 焦土作戦で住民が立ち去った後の静寂な村。 |
| **`village_square`** | 村の広場 | 自然・集落 | `assets/story/backgrounds/village_square.webp` | 村人たちが集まる中央広場。 |
| **`castle`** | 城 / 砦 | 城・宮殿・施設 | `assets/story/backgrounds/castle.webp` | 重厚な石造りの城塞・城門。 |
| **`church_inside`** | 教会内 / 大聖堂 | 城・宮殿・施設 | `assets/story/backgrounds/church_inside.webp` | ステンドグラスと高いアーチ天井を持つ教会・大聖堂の内部。戴冠式やミサに使用。 |
| **`church_prayer`** | 教会の祈りの場 | 城・宮殿・施設 | `assets/story/backgrounds/church_prayer.webp` | 祭壇の前で祈りを捧げる神聖な空間。 |
| **`monastery`** | 修道院 | 城・宮殿・施設 | `assets/story/backgrounds/monastery.webp` | 静謐な石造りの修道院回廊。 |
| **`palace_inside`** | 宮殿内 / 大広間 | 城・宮殿・施設 | `assets/story/backgrounds/palace_inside.webp` | 王や貴族が集う宮殿内の豪奢な大広間。 |
| **`palace_inside_night`** | 宮殿内 (夜) | 城・宮殿・施設 | `assets/story/backgrounds/palace_inside_night.webp` | 夜の宮殿内。密談や夜行シーンに使用。 |
| **`palace_view`** | 宮殿の眺望 / 宮殿外観 | 城・宮殿・施設 | `assets/story/backgrounds/palace_view.webp` | 壮麗な宮殿の遠景およびテラスからの眺め。 |
| **`room_meeting`** | 対面の部屋 / 会談室 | 城・宮殿・施設 | `assets/story/backgrounds/room_meeting.webp` | 2人が机を挟んで真剣に向き合う会談の場。 |
| **`sickroom`** | 病室 1 | 城・宮殿・施設 | `assets/story/backgrounds/sickroom.webp` | ベッドが置かれた治療・静養用の部屋。 |
| **`sickroom_2`** | 病室 2 | 城・宮殿・施設 | `assets/story/backgrounds/sickroom_2.webp` | 薄暗い病室・臨終のシーン。 |
| **`bg_market`** | マルセイユ市場 (Marché) | 街・港・市場 | `assets/story/backgrounds/bg_market.webp` | 新鮮な食材が並ぶ活気あるマルセイユの市場。 |
| **`bg_marseille`** | マルセイユの街並み | 街・港・市場 | `assets/story/backgrounds/bg_marseille.webp` | 地中海に面した港町マルセイユの歴史ある街並み。 |
| **`bg_port`** | マルセイユ港 | 街・港・市場 | `assets/story/backgrounds/bg_port.webp` | 船が行き交う港の風景。 |
| **`bg_port_container`** | 港のコンテナ置き場 | 街・港・市場 | `assets/story/backgrounds/bg_port_container.webp` | 港のコンテナが積み上げられたエリア。追走劇や事件シーンに使用。 |

---

## 3. 単色・グラデーション背景

| キー (ID) | 値 | 説明 |
| :--- | :--- | :--- |
| **`bgBlack`** | `"#000000"` | 暗転、モノローグ、場面転換 |
| **`bgWhite`** | `"#ffffff"` | 暗転からの目覚め、閃光 |
