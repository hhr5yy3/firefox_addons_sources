var getChecks = "query GetChecks($owner: String!, $name: String!) {\n\trepository(owner: $owner, name: $name) {\n\t\tdefaultBranchRef {\n\t\t\ttarget {\n\t\t\t\t... on Commit {\n\t\t\t\t\thistory(first: 3) {\n\t\t\t\t\t\tnodes {\n\t\t\t\t\t\t\toid\n\t\t\t\t\t\t\tstatusCheckRollup {\n\t\t\t\t\t\t\t\tstate\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n}\n";

export { getChecks as default };
