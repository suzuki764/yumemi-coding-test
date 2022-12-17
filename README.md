# yumemi-coding-test
## 概要
コーディングテストとして作成したWebアプリケーションです。

以下の機能を備えています
1. RESAS(地域経済分析システム) APIの「都道府県一覧」APIから取得する
2. APIレスポンスから都道府県一覧のチェックボックスを動的に生成する
3. 都道府県にチェックを入れると、RESAS APIから選択された都道府県の「人口構成」を取得する
4. 人口構成APIレスポンスから、X軸:年、Y軸:人口数の折れ線グラフを動的に生成して表示する

## 開発環境
### バージョン管理ツール
- asdf

### 準備
```sh
npm i -g yarn
yarn install --flozen-lockfile
```

`.env.local`を作成する
```
NEXT_PUBLIC_API_KEY=<RESASのAPIキー>
```
- https://opendata.resas-portal.go.jp/

### 実行
```sh
yarn dev
```
