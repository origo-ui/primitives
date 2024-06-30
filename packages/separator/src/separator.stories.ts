import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import "./separator";

interface SeparatorProps {
	name: string;
	count: number;
}

const meta = {
	title: "Separator",
	tags: ["autodocs"],
} satisfies Meta<SeparatorProps>;

export default meta;
type Story = StoryObj<SeparatorProps>;

export const Styled: Story = {
	args: {},
	render: () => html`
		<style>
			.origo-separator__root {
				border: none;
				background-color: red;
			}

			.origo-separator__root[data-orientation="horizontal"] {
				height: 1px;
				width: 100%;
				margin: 20px 0;
			}

			.origo-separator__root[data-orientation="vertical"] {
				height: 100px;
				width: 1px;
				margin: 0 20px;
			}
		</style>

		<h1>Horizontal</h1>
		<p>The following separator is horizontal and has semantic meaning.</p>
		<origo-separator orientation="horizontal"></origo-separator>

		<h1>Vertical</h1>
		<div style="display: flex; align-items: center;">
			<p>The following separator is vertical and has semantic meaning.</p>
			<origo-separator orientation="vertical"></origo-separator>
		</div>
	`,
};
