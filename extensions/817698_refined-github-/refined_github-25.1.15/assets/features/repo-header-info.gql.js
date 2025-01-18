var GetRepositoryInfo = "query GetRepositoryInfo($owner: String!, $name: String!) {\n\trepository(owner: $owner, name: $name) {\n\t\tstargazerCount\n\t\tisFork\n\t\tisPrivate\n\t\tviewerHasStarred\n\t}\n}\n";

export { GetRepositoryInfo as default };
