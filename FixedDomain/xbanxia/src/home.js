function execute() {
    return Response.success([
        {title: "耽美同人", input: "/list/1_1", script: "top1.js"},
        {title: "男頻熱文", input: "/list/2_1", script: "top2.js"},
        {title: "現代情感", input: "/list/3_1", script: "top3.js"},
        {title: "古裝迷情", input: "/list/4_1", script: "top4.js"},
        {title: "穿越重生", input: "/list/5_1", script: "top5.js"},
    ]);
}