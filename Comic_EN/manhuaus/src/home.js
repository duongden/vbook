function execute() {
    return Response.success([
        {title: "New", input: "/manga/?m_orderby=new-manga", script: "gen.js"},
        {title: "Latest Update", input: "/manga/?m_orderby=latest", script: "gen.js"},
        {title: "Rating", input: "/manga/?m_orderby=rating", script: "gen.js"},
        {title: "Most Views", input: "/manga/?m_orderby=views", script: "gen.js"},
    ]);
}