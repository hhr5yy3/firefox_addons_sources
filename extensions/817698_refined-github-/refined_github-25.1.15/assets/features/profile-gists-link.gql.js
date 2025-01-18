var GetGistCount = "query getGistCount($username: String!) {\n\tuser(login: $username) {\n\t\tgists(first: 0) {\n\t\t\ttotalCount\n\t\t}\n\t}\n}\n";

export { GetGistCount as default };
