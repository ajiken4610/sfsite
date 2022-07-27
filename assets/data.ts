import { SFProjectData } from "~~/composables/firestore";

export default {
  owners: {
    "573948": {
      name: "レッドストーン研究組",
      description: "レッドストーンを研究する人たち(1人)です。",
      parent: "syuk0i",
      icon: "this is icon url",
      childIds: [],
    },
    "5e4gmr": {
      name: "図書",
      description: "図書",
      parent: "4277pq",
      childIds: [],
    },
    cpzgk4: {
      name: "生徒会",
      description: "生徒会",
      parent: "4277pq",
      childIds: [],
    },
    "4277pq": {
      name: "委員会",
      description: "委員会",
      parent: "6lqg5f",
      childIds: ["5e4gmr", "cpzgk4"],
    },
    "7mcx4w": {
      name: "カトリック研究会",
      description: "カトリック研究会",
      parent: "wxeukz",
      childIds: [],
    },
    "99sgyh": {
      name: "パソコン部",
      description: "パソコン部",
      parent: "wxeukz",
      childIds: [],
    },
    vhx0vp: {
      name: "ピアノ同好会",
      description: "ピアノ同好会",
      parent: "wxeukz",
      childIds: [],
    },
    lejd3w: {
      name: "化学班",
      description: "化学班",
      parent: "16leuf",
      childIds: [],
    },
    "6thfb6": {
      name: "生物班",
      description: "生物班",
      parent: "16leuf",
      childIds: [],
    },
    d4u6fs: {
      name: "物理班",
      description: "物理班",
      parent: "16leuf",
      childIds: [],
    },
    "16leuf": {
      name: "自然科学部",
      description: "自然科学部",
      parent: "wxeukz",
      childIds: ["lejd3w", "6thfb6", "d4u6fs"],
    },
    "6xsjdu": {
      name: "軽音楽部",
      description: "軽音楽部",
      parent: "wxeukz",
      childIds: [],
    },
    gc00c2: {
      name: "吹奏楽部",
      description: "吹奏楽部",
      parent: "wxeukz",
      childIds: [],
    },
    tv64qc: {
      name: "写真班",
      description: "写真班",
      parent: "jeskqy",
      childIds: [],
    },
    "7o3a1v": {
      name: "美術班",
      description: "美術班",
      parent: "jeskqy",
      childIds: [],
    },
    jeskqy: {
      name: "美術部",
      description: "美術部",
      parent: "wxeukz",
      childIds: ["tv64qc", "7o3a1v"],
    },
    h9hr64: {
      name: "鉄道模型部",
      description: "鉄道模型部",
      parent: "wxeukz",
      childIds: [],
    },
    nu7391: {
      name: "ジャグリング部",
      description: "ジャグリング部",
      parent: "wxeukz",
      childIds: [],
    },
    arttp7: {
      name: "囲碁将棋同好会",
      description: "囲碁将棋同好会",
      parent: "wxeukz",
      childIds: [],
    },
    r9echm: {
      name: "文芸班",
      description: "文芸班",
      parent: "f8mo0k",
      childIds: [],
    },
    sbcgp3: {
      name: "歴史班",
      description: "歴史班",
      parent: "f8mo0k",
      childIds: [],
    },
    f8mo0k: {
      name: "文芸部",
      description: "文芸部",
      parent: "wxeukz",
      childIds: ["r9echm", "sbcgp3"],
    },
    v41x3s: {
      name: "ESS同好会",
      description: "ESS同好会",
      parent: "wxeukz",
      childIds: [],
    },
    wxeukz: {
      name: "部活動",
      description: "部活動",
      parent: "6lqg5f",
      childIds: [
        "7mcx4w",
        "99sgyh",
        "vhx0vp",
        "16leuf",
        "6xsjdu",
        "gc00c2",
        "jeskqy",
        "h9hr64",
        "nu7391",
        "arttp7",
        "f8mo0k",
        "v41x3s",
      ],
    },
    "4o57f4": {
      name: "アーカイブ",
      description: "アーカイブ",
      parent: "uhe81q",
      childIds: [],
    },
    s9v599: {
      name: "ライブ",
      description: "ライブ",
      parent: "uhe81q",
      childIds: [],
    },
    uhe81q: {
      name: "生配信",
      description: "生配信",
      parent: "6lqg5f",
      childIds: ["4o57f4", "s9v599"],
    },
    "0dpgoa": {
      name: "キルトBee",
      description: "キルトBee",
      parent: "4hjoim",
      childIds: [],
    },
    "4hjoim": {
      name: "保護者会",
      description: "保護者会",
      parent: "6lqg5f",
      childIds: ["0dpgoa"],
    },
    tfufjb: {
      name: "有志企画",
      description: "有志企画",
      parent: "6lqg5f",
      childIds: [],
    },
    hky1vs: {
      name: "体験授業",
      description: "体験授業",
      parent: "6lqg5f",
      childIds: [],
    },
    "9sxnm4": {
      name: "アカデミア班",
      description: "アカデミア班",
      parent: "wuhuur",
      childIds: [],
    },
    d0sxbx: {
      name: "アーチ班",
      description: "アーチ班",
      parent: "wuhuur",
      childIds: [],
    },
    uoy0vg: {
      name: "会計班",
      description: "会計班",
      parent: "wuhuur",
      childIds: [],
    },
    "09lu4q": {
      name: "執行班",
      description: "執行班",
      parent: "wuhuur",
      childIds: [],
    },
    qqxwon: {
      name: "広報班",
      description: "広報班",
      parent: "wuhuur",
      childIds: [],
    },
    zfka6h: {
      name: "美術班",
      description: "美術班",
      parent: "wuhuur",
      childIds: [],
    },
    syuk0i: {
      name: "IT班",
      description: "IT班",
      parent: "wuhuur",
      childIds: ["573948"],
    },
    "5i8qy7": {
      name: "総務班",
      description: "総務班",
      parent: "wuhuur",
      childIds: [],
    },
    shao66: {
      name: "実行委員",
      description: "実行委員",
      parent: "wuhuur",
      childIds: [],
    },
    tr16fz: {
      name: "装飾班",
      description: "装飾班",
      parent: "wuhuur",
      childIds: [],
    },
    vsc605: {
      name: "イベント班",
      description: "イベント班",
      parent: "wuhuur",
      childIds: [],
    },
    wuhuur: {
      name: "運営",
      description: "運営",
      parent: "6lqg5f",
      childIds: [
        "9sxnm4",
        "d0sxbx",
        "uoy0vg",
        "09lu4q",
        "qqxwon",
        "zfka6h",
        "syuk0i",
        "5i8qy7",
        "shao66",
        "tr16fz",
        "vsc605",
      ],
    },
    "67oypc": {
      name: "国際交流",
      description: "国際交流",
      parent: "ecxznh",
      childIds: [],
    },
    u2d4u8: {
      name: "美術",
      description: "美術",
      parent: "ecxznh",
      childIds: [],
    },
    ecxznh: {
      name: "教科",
      description: "教科",
      parent: "6lqg5f",
      childIds: ["67oypc", "u2d4u8"],
    },
    "2d5lgu": {
      name: "B組",
      description: "B組",
      parent: "ej2m1a",
      childIds: [],
    },
    sohi0a: { name: "D組", description: "D組", parent: "ej2m1a", childIds: [] },
    "4ypfcz": {
      name: "C組",
      description: "C組",
      parent: "ej2m1a",
      childIds: [],
    },
    i2fod9: { name: "A組", description: "A組", parent: "ej2m1a", childIds: [] },
    ej2m1a: {
      name: "4年",
      description: "4年",
      parent: "y994nm",
      childIds: ["2d5lgu", "sohi0a", "4ypfcz", "i2fod9"],
    },
    kdd27p: { name: "A組", description: "A組", parent: "fz74tm", childIds: [] },
    "1y6wzi": {
      name: "B組",
      description: "B組",
      parent: "fz74tm",
      childIds: [],
    },
    ls6wa4: { name: "C組", description: "C組", parent: "fz74tm", childIds: [] },
    vz0hcy: { name: "D組", description: "D組", parent: "fz74tm", childIds: [] },
    fz74tm: {
      name: "2年",
      description: "2年",
      parent: "y994nm",
      childIds: ["kdd27p", "1y6wzi", "ls6wa4", "vz0hcy"],
    },
    "2lani1": {
      name: "F組",
      description: "F組",
      parent: "6zfrd9",
      childIds: [],
    },
    xip46w: { name: "C組", description: "C組", parent: "6zfrd9", childIds: [] },
    "50s8jz": {
      name: "B組",
      description: "B組",
      parent: "6zfrd9",
      childIds: [],
    },
    fl36af: { name: "A組", description: "A組", parent: "6zfrd9", childIds: [] },
    e3nuxu: { name: "E組", description: "E組", parent: "6zfrd9", childIds: [] },
    u38utw: { name: "D組", description: "D組", parent: "6zfrd9", childIds: [] },
    "6zfrd9": {
      name: "6年",
      description: "6年",
      parent: "y994nm",
      childIds: ["2lani1", "xip46w", "50s8jz", "fl36af", "e3nuxu", "u38utw"],
    },
    hup6lx: { name: "B組", description: "B組", parent: "utqk51", childIds: [] },
    jt5myr: { name: "C組", description: "C組", parent: "utqk51", childIds: [] },
    fe8p7e: { name: "A組", description: "A組", parent: "utqk51", childIds: [] },
    t70mcl: { name: "D組", description: "D組", parent: "utqk51", childIds: [] },
    utqk51: {
      name: "1年",
      description: "1年",
      parent: "y994nm",
      childIds: ["hup6lx", "jt5myr", "fe8p7e", "t70mcl"],
    },
    vx84vf: { name: "B組", description: "B組", parent: "jzfwpi", childIds: [] },
    to8sc7: { name: "C組", description: "C組", parent: "jzfwpi", childIds: [] },
    gxm3qk: { name: "A組", description: "A組", parent: "jzfwpi", childIds: [] },
    wbnck8: { name: "E組", description: "E組", parent: "jzfwpi", childIds: [] },
    "5py39a": {
      name: "D組",
      description: "D組",
      parent: "jzfwpi",
      childIds: [],
    },
    yyr97b: { name: "F組", description: "F組", parent: "jzfwpi", childIds: [] },
    jzfwpi: {
      name: "5年",
      description: "5年",
      parent: "y994nm",
      childIds: ["vx84vf", "to8sc7", "gxm3qk", "wbnck8", "5py39a", "yyr97b"],
    },
    p0z6jq: { name: "C組", description: "C組", parent: "msy1rr", childIds: [] },
    ytv6yp: { name: "B組", description: "B組", parent: "msy1rr", childIds: [] },
    lbec3f: { name: "A組", description: "A組", parent: "msy1rr", childIds: [] },
    x6xqem: { name: "D組", description: "D組", parent: "msy1rr", childIds: [] },
    msy1rr: {
      name: "3年",
      description: "3年",
      parent: "y994nm",
      childIds: ["p0z6jq", "ytv6yp", "lbec3f", "x6xqem"],
    },
    y994nm: {
      name: "クラス企画",
      description: "クラス企画",
      parent: "6lqg5f",
      childIds: ["ej2m1a", "fz74tm", "6zfrd9", "utqk51", "jzfwpi", "msy1rr"],
    },
    "6lqg5f": {
      name: "2022",
      description: "2022",
      parent: "0f46rv",
      childIds: [
        "4277pq",
        "wxeukz",
        "uhe81q",
        "4hjoim",
        "tfufjb",
        "hky1vs",
        "wuhuur",
        "ecxznh",
        "y994nm",
      ],
    },
    "0f46rv": { name: "sf", description: "sf", childIds: ["6lqg5f"] },
  },
  projects: {
    SJFHOh: {
      project: {
        title:
          "【Nuxt3】サレ祭のサイトのプレビューを作ってみましたわ～～～！！【ですわ～】",
        description:
          "今回は、マインクラフト1.18.2で、ブロック輸送回路と、カウンタ回路を作ってみました！\n頑張って作ったので、ぜひ最後まで見ていってください！！！！\n\n- ブロック輸送回路\nブロックをピストンでガシャガシャして目的の場所へ輸送する回路です。\n    1. 直列ピストン式\n    1. 横からガシャガシャ式\n- カウンタ回路\nインクリメント、デクリメントができる回路です。\n    1. 試作機\n    1. 1つ目を最適化",
        id: "U1yJjrPUs80",
        owner: "573948",
        pid: "SJFHOh",
        tags: [
          "マインクラフト",
          "レッドストーン",
          "Minecraft",
          "Redstone",
          "た",
          "く",
          "さ",
          "ん",
          "の",
          "ぐ",
          "が",
          "あ",
          "った",
          "ら",
          "どう",
          "なる",
          "のか",
        ],
        thumbnail: "https://img.youtube.com/vi/U1yJjrPUs80/default.jpg",
        type: "youtube",
      },
      uid: "SJFHOh",
    },
    eWJJgl: {
      project: {
        title: "いかにしてコンピュータは3Dのものを描画するか",
        description:
          "# はじめに\nコンピュータが3Dのものを描画する仕組みは、感動する。\n感動するので、ぜひ知ってもらいたいと思い、この記事を書いている。\n今回は、OpenGLというライブラリの例を示す。\n## 予備知識：行列とベクトル\n少しだけ、数学の知識が必要となるが、身構えないでほしい。\nというのも、コンピュータの世界で重要なのは、計算力でも計算する方法でもなく、計算結果が何の意味を持つかであるからだ。それを覚えるのはとても簡単だと思う。\nそこで、この記事を理解するのに必要な数学の知識、行列とベクトルの性質について示しておきたい。\n計算方法も併せて紹介しているが、ここでは覚える必要は全くない。\n### ベクトルと行列\n- スカラー\nスカラーとは、長さだけを持つ値だ。\n- ベクトル\nベクトルとは、長さと方向を持つ値だ。\n- 行列\n行列とは、ベクトルが複数集まったものだ。\n- ちなみに\nベクトル、行列、行列が複数集まったもの、(行列が複数集まったもの)が複数集まったもの、...をテンソルとか言う。AIのアルゴリズムの一つである、ディープラーニングでよく使われると聞く。\n### ベクトルの長さ\nベクトルの長さは、以下の様に絶対値記号を用いて表す。\n`$$|\\vec{a}|$$`\n### 単位ベクトル\n単位ベクトルとは、ベクトルの中でも、長さが`$1$`であるものをいう。\n`$\\vec{a}$`の単位ベクトル`$\\vec{e}$`は以下のようにあらわせる。\n```math\n$$\n\\vec{e} = \\frac{\\vec{a}}{|\\vec{a}|}\n$$\n```\n### ベクトルの内積\nベクトルの内積は、以下のように計算でき、結果はスカラーとなる。\n```math\n$$\n\\begin{pmatrix}a\\\\b\\\\c\\end{pmatrix}\n\\cdot\n\\begin{pmatrix}x\\\\y\\\\z\\end{pmatrix}\n=ax+by+cz\n$$\n```\nまた、以下の様にも表せる。\n`$$\\vec{a}\\cdot\\vec{b}=|\\vec{a}||\\vec{b}|\\cos(\\vec{a}と\\vec{b}のなす角)$$`\n両方のベクトルが単位ベクトルの時、内積は2つのベクトルのなす角のコサインとなる。\n### ベクトルの外積\nベクトルの外積は、以下のように計算する\n```math\n$$\n\\begin{pmatrix}a\\\\b\\\\c\\end{pmatrix}\n\\times\n\\begin{pmatrix}x\\\\y\\\\z\\end{pmatrix}\n=\n\\begin{pmatrix}bz-cy\\\\cx-az\\\\ay-bx\\end{pmatrix}\n$$\n```\n外積で求められるベクトルは、2つのベクトルに対して垂直な方向となる。\n### 行列の外積\n行列の外積は、以下のように求められる。\n```math\n$$\n\\begin{pmatrix}\na&b\\\\\nc&d\n\\end{pmatrix}\n\\times\n\\begin{pmatrix}\nd&f\\\\\ng&h\n\\end{pmatrix}\n=\n\\begin{pmatrix}\nae+bg&af+bh\\\\\nce+dg&cf+dh\n\\end{pmatrix}\n$$\n```\n行列は、交換法則が成り立たない。\n行列の外積は、2つの行列を合わせた意味を持つ、と覚えておくといい。\n# 描画が行われる仕組み\n前提知識の説明が終わったので、ここから仕組みを説明していく。\n## ビューポート\nまず、描画する範囲：ビューポートを定義する。\n以下の様に画面上の座標を定める。\n```math\n$$\n\\begin{CD}\n(-1,1) @>0.5>> (0,1) @>0.5>> (1,1)   \\\\\n@A0.5AA        @A0.5AA    @A0.5AA    \\\\\n(-1,0) @>0.5>> (0,0) @>0.5>> (1,0)   \\\\\n@A0.5AA        @A0.5AA       @A0.5AA \\\\\n(-1,-1) @>0.5>> (0,-1) @>0.5>> (1,-1)\n\\end{CD}\n$$\n```\n画面の中央を(0,0)、画面の右上方向を正とした座標を描画領域とする。\n### Z軸は何処へ\n画面にZ軸方向はない。画面はどう見ても2次元でありますので。\n計算はZ軸のデータも計算するが、描画する際に、Z軸方向のデータは無視してX,Y軸方向のデータだけを用いて描画を行う。\n## すべては三角形\n頂点の座標を計算するのは簡単である。移動回転縮小など、頂点の座標なら簡単に計算できるだろう。\nところで、三角形は3つの頂点の座標が定まれば一意に面が定まる。\nこの性質を利用すれば、3つの頂点の座標を計算するだけで三角形が描画できてしまうではないか。\n試しに計算してみよう。\n`$A(0.5,0.5,0.0),B(0.0,-0.5,0.5),C(-0.5,0.0,-0.5)$`としたとき、`$\\triangle ABC$`を考える。\n描画する際にはZ軸のデータを無視すればよいので、2次元にすると、\n`$A(0.5,0.5),B(0.0,-0.5),C(-0.5,0.0)$`である`$\\triangle ABC$`\nを描画すればよいとわかる。\n## 平行移動、拡大縮小、回転\n3Dグラフィックの分野では、すべての座標を位置ベクトルとして計算し、すべての計算を行列式として計算すると思っていい。\nここでは、平行移動、拡大縮小、回転をベクトルと行列の積として考える。\n### 位置ベクトルの表し方\n以下、点`$A,B,C$`と位置ベクトル`$\\vec{a},\\vec{b},\\vec{c}$`を以下のように定める。\n`$$A(0.5,0.5,0.0),B(0.0,-0.5,0.5),C(-0.5,0.0,-0.5)$$`\n```math\n$$\n\\vec{a}=\\begin{pmatrix}0.5\\\\0.5\\\\0.0\\\\1.0\\end{pmatrix},\n\\vec{b}=\\begin{pmatrix}0.0\\\\-0.5\\\\0.5\\\\1.0\\end{pmatrix},\n\\vec{c}=\\begin{pmatrix}-0.5\\\\0.0\\\\-0.5\\\\1.0\\end{pmatrix}\n$$\n```\n#### ベクトルは4次元\n上のベクトル`$\\vec{a},\\vec{b},\\vec{c}$`が4次元ベクトルであることに気づいただろう。\n一般に、位置ベクトルを計算するときは、次元が1つ多いと都合がいいことが多い。\n何が都合がいいかを説明していこう。\n### 平行移動\n平行移動行列`$P$`を、移動量`$dx,dy,dz$`としたとき、以下のように定める。\n```math\n$$\nP=\n\\begin{pmatrix}\n1&0&0&dx\\\\\n0&1&0&dy\\\\\n0&0&1&dz\\\\\n0&0&0&1\\\\\n\\end{pmatrix}\n$$\n```\nこれを、位置座標のベクトルと掛け算すると、平行移動が完了する。\n長くなるので、点Aを平行移動した位置ベクトル`$\\vec{p}$`についてのみ示す。\n```math\n$$\n\\vec{p}=\\begin{pmatrix}1&0&0&dx\\\\0&1&0&dy\\\\0&0&1&dz\\\\0&0&0&1\\end{pmatrix}\n\\begin{pmatrix}0.5\\\\0.5\\\\0.0\\\\1.0\\end{pmatrix}\n=\n\\begin{pmatrix}0.5+dx\\\\0.5+dy\\\\0.0+dz\\\\1.0\\end{pmatrix}\n$$\n```\nなんと!行列を掛け算しただけで平行移動が完了してしまった。\n平行移動は、ベクトルに4次元目の1.0がないと、計算ができないので、4次元目はあって都合がよいのだ。\n### 拡大縮小\n",
        owner: "99sgyh",
        pid: "eWJJgl",
        tags: ["cg", "パソコン", "プログラミング", "数学"],
        type: "none",
      },
      uid: "eWJJgl",
    },
    t42w4u: {
      project: {
        title: "Markdownの教科書",
        description:
          "# `Markdown`とは？\n`Markdown`は、文字を装飾するための規格です。(マークアップ言語などと呼ばれます。)  \nこの記事自体もMarkdownを使用して書かれています。\n```button\nこのページのソースを表示\n/editor/t42w4utKR6AmKfricono\n```\n書き方を例とともに示します。\n\n## タイトル、見出し、小見出し、...\n### 書き方\n-   分類の大きさに応じて`#`を連ねます。\n\n### 注意点\n-   `#`の後に半角スペース` `を入れるのを忘れないでください。\n\n### 例\n#### ソース\n```markdown\n# タイトル\nタイトルの中身\n## 見出し\n見出しの中身\n### 小見出し\n小見出しの中身\n...以下同じように「#」の数を変えることで見出しの大きさを変更できる。\n```\n#### 実行結果\n> # タイトル\n> タイトルの中身\n> ## 見出し\n> 見出しの中身\n> ### 小見出し\n> 小見出しの中身\n> ...以下同じように「#」の数を変えることで見出しの大きさを変更できる。\n\n## 箇条書き\n### 書き方\n-   項目の頭に`-   `(ハイフン`−`+半角スペース` `×3)を挿入します。\n-   インデントをずらすことでネストさせることができます。\n\n### 注意点\n-   `−`のあとの空白を忘れないでください。\n-   箇条書きの上下に空の行を入れるのを忘れないでください。\n\n### 例\n#### ソース\n```markdown\n\n-   1つ目  \n1つ目の説明文\n-   2つ目  \n2つ目の説明文\n-   3つ目  \n3つ目の説明文\n    -   3つ目の1つ目の項目\n    -   3つ目の2つ目の項目\n\n```\n#### 実行結果\n> -   1つ目  \n> 1つ目の説明文\n> -   2つ目  \n> 2つ目の説明文\n> -   3つ目  \n> 3つ目の説明文\n>     -   3つ目の1つ目の項目\n>     -   3つ目の2つ目の項目\n\n## 番号付き箇条書き\n### 書き方\n-   `1. `と書くと、数字付きで項目を連ねることができます。番号は自動で割り振られます。\n-   インデントをずらすことでネストすることができます。\n\n### 注意点\n-   数字とドットは**半角**で、**半角スペース**を忘れずに。\n-   上下に空行を入れるのを忘れないように。\n\n### 例\n#### ソース\n```markdown\n\n1. これは１つ目  \nこれは1つ目の説明\n1. これは2つ目  \nこれは2つ目の説明\n1. これは3つ目  \nこれは3つ目の説明\n    1. これは3つ目の1つ目の項目\n    1. これは3つ目の2つ目の項目\n\n```\n#### 実行結果\n\n> 1. これは１つ目  \n> これは1つ目の説明\n> 1. これは2つ目  \n> これは2つ目の説明\n> 1. これは3つ目  \n> これは3つ目の説明\n>     1. これは3つ目の1つ目の項目\n>     1. これは3つ目の2つ目の項目\n\n## 引用\n### 書き方\n-   引用は、記号`>`を用いて表すことができます。\n\n### 注意点\n-   引用範囲の上下に空白が必要です。\n\n### 例\n#### ソース\n```markdown\n> これは  \n> 引用  \n> です\n```\n#### 実行結果\n> > これは  \n> > 引用  \n> > です\n\n(引用タグの中に引用タグを使っているので、線が2本ありますが、1つだけ引用タグを使えば1本だけ表示されます。)\n\n## 文字装飾\n### 書き方\n-   それぞれ対応する記号で囲みます。\n\n|種類|記号|例|プレビュー|\n|:-|:-:|:-|:-|\n|斜体|`*`|`*ITALIC*`|*ITALIC*|\n|太字|`**`|`**BOLD**`|**BOLD**|\n|斜体太字|`***`|`***ITALICBOLD***`|***ITALICBOLD***|\n|取り消し|`~~`|`~~DELETED~~`|~~DELETED~~|\n|下線|`<u></u>`|`<u>UNDERLINED</u>`|<u>UNDERLINED</u>|\n\n\n## リンク\n### 書き方\n```markdown\n[表示する文字列](リンク)\n```\n### 例\n#### ソース\n```markdown\n[Twitter](https://twitter.com)\n-\n```\n#### 実行結果\n[Twitter](https://twitter.com)\n\n## 画像\n### 書き方\n```markdown\n![画像が読み込めなかったときの代替テキスト](画像のURL)\n```\n### 例\n#### ソース\n```markdown\n![5分で1000文字行った！](https://drive.google.com/uc?id=1tX2rYAsKNCHorCttImuzs-cRNfTNKeAz)\n```\n#### 実行結果\n![5分で1000文字行った！](https://drive.google.com/uc?id=1tX2rYAsKNCHorCttImuzs-cRNfTNKeAz)\n\n## Markdown記法にはないがサレ祭のサイトでは使える独自構文\n普通のMarkdownにはないが、サレ祭のサイトでは使用できる構文。\n## ボタン\n### 書き方\n````markdown\n```button\nテキスト\nリンク\n```\n````\n\n### 例\n#### ソース\n````markdown\n```button\nYoutube\nhttps://youtube.com/\n```\n````\n#### 実行結果\n```button\nYoutube\nhttps://youtube.com/\n```\n\n## ダイアログ表示ボタン\n### 書き方\n````markdown\n```button-modal\nボタンのテキスト\nダイアログの内容\n```\n````\n### 例\n#### ソース\n````markdown\n```button-modal\nクリックして表示\n# こんにちは\nこんにちは。私は、私です。\nだからどうしたんだよってね。\n```\n````\n#### 実行結果\n```button-modal\nクリックして表示\n# こんにちは\nこんにちは。私は、私です。\nだからどうしたんだよってね。\n```\n## Youtube動画\n### 書き方\n````markdown\n```youtube\n動画のID\n```\n````\n### 例\n#### ソース\n````markdown\n```youtube\nvOGMXG-uINM\n```\n````\n#### 実行結果\n```youtube\nvOGMXG-uINM\n```\n## Driveのコンテンツ\n### 書き方\n````markdown\n```drive\nファイルID\n```\n````\n### 例\n#### ソース\n````markdown\n```drive\n149SFvFcfE7tDuZP1fRvIPub-kcVKVYsK\n```\n````\n#### 実行結果\n```drive\n149SFvFcfE7tDuZP1fRvIPub-kcVKVYsK\n```\n### 豆知識\nDriveの生ファイルは、以下のようなリンクにある。\n`https://drive.google.com/uc?id=ファイルID`\nDriveの画像などを埋め込みたい場合はこれが便利。\n## 数式\nKatex記法で、数式を記述することができる。\nKatex記法は、以下のドキュメントを参照されたい。\nhttps://katex.org/docs/supported.html\nhttps://katex.org/docs/support_table.html\n### 記法\n```markdown\n`$数式$`\n```\n```markdown\n`$$数式(段落表示)$$`\n```\n````markdown\n```math\n$$数式(段落表示)$$\n```\n````\n### 例\n#### ソース\n````markdown\n`$\\vec{a}$`\n`$$(a+b)(x+y)=ax+ay+bx+by$$`\n```math\n$$\n\\begin{pmatrix}a\\\\b\\\\c\\end{pmatrix}\n\\times\n\\begin{pmatrix}x\\\\y\\\\z\\end{pmatrix}\n=\n\\begin{pmatrix}bz-cy\\\\cx-az\\\\ay-bx\\end{pmatrix}\n$$\n```\n````\n#### 実行結果\n`$\\vec{a}$`\n`$$(a+b)(x+y)=ax+ay+bx+by$$`\n```math\n$$\n\\begin{pmatrix}a\\\\b\\\\c\\end{pmatrix}\n\\times\n\\begin{pmatrix}x\\\\y\\\\z\\end{pmatrix}\n=\n\\begin{pmatrix}bz-cy\\\\cx-az\\\\ay-bx\\end{pmatrix}\n$$\n```",
        id: "",
        owner: "syuk0i",
        pid: "t42w4u",
        tags: ["Markdown"],
        thumbnail: "",
        type: "none",
      },
      uid: "t42w4u",
    },
  },
  bigrams: {
    projects: {
      "【n": ["SJFHOh"],
      nu: ["SJFHOh"],
      ux: ["SJFHOh"],
      xt: ["SJFHOh"],
      t3: ["SJFHOh"],
      "3】": ["SJFHOh"],
      "】さ": ["SJFHOh"],
      され: ["SJFHOh"],
      れ祭: ["SJFHOh"],
      祭の: ["SJFHOh"],
      のさ: ["SJFHOh"],
      さい: ["SJFHOh"],
      いと: ["SJFHOh"],
      との: ["SJFHOh"],
      のふ: ["SJFHOh"],
      ふれ: ["SJFHOh"],
      れび: ["SJFHOh"],
      びゅ: ["SJFHOh"],
      ゅー: ["SJFHOh", "eWJJgl"],
      ーを: ["SJFHOh"],
      を作: ["SJFHOh"],
      作っ: ["SJFHOh"],
      って: ["SJFHOh"],
      てみ: ["SJFHOh"],
      みま: ["SJFHOh"],
      まし: ["SJFHOh"],
      した: ["SJFHOh"],
      たわ: ["SJFHOh"],
      "わ～": ["SJFHOh"],
      "～～": ["SJFHOh"],
      "～！": ["SJFHOh"],
      "！！": ["SJFHOh"],
      "！【": ["SJFHOh"],
      "【で": ["SJFHOh"],
      です: ["SJFHOh"],
      すわ: ["SJFHOh"],
      "～】": ["SJFHOh"],
      いか: ["eWJJgl"],
      かに: ["eWJJgl"],
      にし: ["eWJJgl"],
      して: ["eWJJgl"],
      てこ: ["eWJJgl"],
      こん: ["eWJJgl"],
      んひ: ["eWJJgl"],
      ひゅ: ["eWJJgl"],
      ーた: ["eWJJgl"],
      たは: ["eWJJgl"],
      は3: ["eWJJgl"],
      "3d": ["eWJJgl"],
      dの: ["eWJJgl"],
      のも: ["eWJJgl"],
      もの: ["eWJJgl"],
      のを: ["eWJJgl"],
      を描: ["eWJJgl"],
      描画: ["eWJJgl"],
      画す: ["eWJJgl"],
      する: ["eWJJgl"],
      るか: ["eWJJgl"],
      ma: ["t42w4u"],
      ar: ["t42w4u"],
      rk: ["t42w4u"],
      kd: ["t42w4u"],
      do: ["t42w4u"],
      ow: ["t42w4u"],
      wn: ["t42w4u"],
      nの: ["t42w4u"],
      の教: ["t42w4u"],
      教科: ["t42w4u"],
      科書: ["t42w4u"],
    },
    owners: {
      "20": ["6lqg5f"],
      "22": ["6lqg5f"],
      れっ: ["573948"],
      っど: ["573948"],
      どす: ["573948"],
      すと: ["573948"],
      とー: ["573948"],
      ーん: ["573948"],
      ん研: ["573948"],
      研究: ["573948", "7mcx4w"],
      究組: ["573948"],
      んを: ["573948"],
      を研: ["573948"],
      究す: ["573948"],
      する: ["573948"],
      る人: ["573948"],
      人た: ["573948"],
      たち: ["573948"],
      "ち(": ["573948"],
      "(1": ["573948"],
      "1人": ["573948"],
      "人)": ["573948"],
      ")で": ["573948"],
      です: ["573948"],
      "す。": ["573948"],
      図書: ["5e4gmr"],
      生徒: ["cpzgk4"],
      徒会: ["cpzgk4"],
      委員: ["4277pq", "shao66"],
      員会: ["4277pq"],
      かと: ["7mcx4w"],
      とり: ["7mcx4w"],
      りっ: ["7mcx4w"],
      っく: ["7mcx4w"],
      く研: ["7mcx4w"],
      究会: ["7mcx4w"],
      はそ: ["99sgyh"],
      そこ: ["99sgyh"],
      こん: ["99sgyh"],
      ん部: ["99sgyh"],
      ひあ: ["vhx0vp"],
      あの: ["vhx0vp"],
      の同: ["vhx0vp"],
      同好: ["vhx0vp", "arttp7", "v41x3s"],
      好会: ["vhx0vp", "arttp7", "v41x3s"],
      化学: ["lejd3w"],
      学班: ["lejd3w"],
      生物: ["6thfb6"],
      物班: ["6thfb6"],
      物理: ["d4u6fs"],
      理班: ["d4u6fs"],
      自然: ["16leuf"],
      然科: ["16leuf"],
      科学: ["16leuf"],
      学部: ["16leuf"],
      軽音: ["6xsjdu"],
      音楽: ["6xsjdu"],
      楽部: ["6xsjdu", "gc00c2"],
      吹奏: ["gc00c2"],
      奏楽: ["gc00c2"],
      写真: ["tv64qc"],
      真班: ["tv64qc"],
      美術: ["7o3a1v", "jeskqy", "zfka6h", "u2d4u8"],
      術班: ["7o3a1v", "zfka6h"],
      術部: ["jeskqy"],
      鉄道: ["h9hr64"],
      道模: ["h9hr64"],
      模型: ["h9hr64"],
      型部: ["h9hr64"],
      じゃ: ["nu7391"],
      ゃぐ: ["nu7391"],
      ぐり: ["nu7391"],
      りん: ["nu7391"],
      んぐ: ["nu7391"],
      ぐ部: ["nu7391"],
      囲碁: ["arttp7"],
      碁将: ["arttp7"],
      将棋: ["arttp7"],
      棋同: ["arttp7"],
      文芸: ["r9echm", "f8mo0k"],
      芸班: ["r9echm"],
      歴史: ["sbcgp3"],
      史班: ["sbcgp3"],
      芸部: ["f8mo0k"],
      es: ["v41x3s"],
      ss: ["v41x3s"],
      s同: ["v41x3s"],
      部活: ["wxeukz"],
      活動: ["wxeukz"],
      あー: ["4o57f4", "d0sxbx"],
      ーか: ["4o57f4"],
      かい: ["4o57f4"],
      いぶ: ["4o57f4", "s9v599"],
      らい: ["s9v599"],
      生配: ["uhe81q"],
      配信: ["uhe81q"],
      きる: ["0dpgoa"],
      ると: ["0dpgoa"],
      とb: ["0dpgoa"],
      be: ["0dpgoa"],
      ee: ["0dpgoa"],
      保護: ["4hjoim"],
      護者: ["4hjoim"],
      者会: ["4hjoim"],
      有志: ["tfufjb"],
      志企: ["tfufjb"],
      企画: ["tfufjb", "y994nm"],
      体験: ["hky1vs"],
      験授: ["hky1vs"],
      授業: ["hky1vs"],
      あか: ["9sxnm4"],
      かで: ["9sxnm4"],
      でみ: ["9sxnm4"],
      みあ: ["9sxnm4"],
      あ班: ["9sxnm4"],
      ーち: ["d0sxbx"],
      ち班: ["d0sxbx"],
      会計: ["uoy0vg"],
      計班: ["uoy0vg"],
      執行: ["09lu4q"],
      行班: ["09lu4q"],
      広報: ["qqxwon"],
      報班: ["qqxwon"],
      it: ["syuk0i"],
      t班: ["syuk0i"],
      総務: ["5i8qy7"],
      務班: ["5i8qy7"],
      実行: ["shao66"],
      行委: ["shao66"],
      装飾: ["tr16fz"],
      飾班: ["tr16fz"],
      いべ: ["vsc605"],
      べん: ["vsc605"],
      んと: ["vsc605"],
      と班: ["vsc605"],
      運営: ["wuhuur"],
      国際: ["67oypc"],
      際交: ["67oypc"],
      交流: ["67oypc"],
      教科: ["ecxznh"],
      b組: ["2d5lgu", "1y6wzi", "50s8jz", "hup6lx", "vx84vf", "ytv6yp"],
      d組: ["sohi0a", "vz0hcy", "u38utw", "t70mcl", "5py39a", "x6xqem"],
      c組: ["4ypfcz", "ls6wa4", "xip46w", "jt5myr", "to8sc7", "p0z6jq"],
      a組: ["i2fod9", "kdd27p", "fl36af", "fe8p7e", "gxm3qk", "lbec3f"],
      "4年": ["ej2m1a"],
      "2年": ["fz74tm"],
      f組: ["2lani1", "yyr97b"],
      e組: ["e3nuxu", "wbnck8"],
      "6年": ["6zfrd9"],
      "1年": ["utqk51"],
      "5年": ["jzfwpi"],
      "3年": ["msy1rr"],
      くら: ["y994nm"],
      らす: ["y994nm"],
      す企: ["y994nm"],
      "02": ["6lqg5f"],
      sf: ["0f46rv"],
    },
  },
} as {
  owners: {
    [key: string]: {
      name: string;
      description: string;
      childIds?: string[];
      parent?: string;
    };
  };
  projects: { [key: string]: SFProjectData };
  bigrams: any;
};
