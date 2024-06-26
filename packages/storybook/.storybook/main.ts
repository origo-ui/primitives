import type { StorybookConfig } from "@storybook/web-components-vite";

import { dirname, join } from "node:path";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
	return dirname(require.resolve(join(value, "package.json")));
}
const config: StorybookConfig = {
	stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
	addons: [
		getAbsolutePath("@storybook/addon-links"),
		getAbsolutePath("@storybook/addon-essentials"),
		getAbsolutePath("@chromatic-com/storybook"),
	],
	framework: {
		name: getAbsolutePath("@storybook/web-components-vite"),
		options: {},
	},
	docs: {
		autodocs: "tag",
	},
	refs: {
		react: {
			title: "React",
			url: "http://localhost:7007",
		},
	},
};
export default config;
