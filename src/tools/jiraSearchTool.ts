import axios from "axios";
import { DynamicTool } from "langchain/tools";
import { ENV_VARIABLES } from "../environment";

export const JiraSearchTool = new DynamicTool({
    name: "jira-issue-search",
    description: "Search Jira issues using JQL query.",
    func: async (jql: string) => {
        console.log("JQL Query:", jql);
        const auth = Buffer.from(
            `${ENV_VARIABLES.JIRA_EMAIL}:${ENV_VARIABLES.JIRA_API_TOKEN}`
        ).toString("base64");

        console.log(`${ENV_VARIABLES.JIRA_URL}/rest/api/3/search`);
        const res = await axios.get(`${ENV_VARIABLES.JIRA_URL}/rest/api/3/search`, {
            headers: {
                Authorization: `Basic ${auth}`,
                Accept: "application/json",
            },
            params: { jql, maxResults: 10 },
        });

        return res.data.issues;
    },
});

JiraSearchTool.func("project = 'BMSAAS' AND (key = BMSAAS-19 OR parent = BMSAAS-19)").then((result) => {
    console.log("Jira Search Result:", result);
}
).catch((error) => {
    console.error("Error in Jira Search Tool:", error);
}
);