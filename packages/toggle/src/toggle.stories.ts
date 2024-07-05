import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import "./toggle";

const meta = {
	title: "Toggle",
	tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Styled: Story = {
	args: {},
	render: () => html`
		<style>
			origo-toggle::part(root) {
				padding: 6px;
				line-height: 1;
				border: none;
				font-family: sans-serif;
				font-weight: bold;
			}

			origo-toggle::part(root):focus {
				outline: none;
				box-shadow: 0 0 0 2px black;
			}

			origo-toggle[disabled]::part(root) {
				opacity: 0.5;
			}

			origo-toggle:not([pressed])::part(root) {
				background-color: red;
				color: white;
			}

			origo-toggle[pressed]::part(root) {
				background-color: green;
				color: white;
			}
		</style>

    <h1>Off</h1>
    <origo-toggle>Toggle</origo-toggle>

    <h1>On</h1>
    <origo-toggle pressed>
      Toggle
    </origo-toggle>

    <h1>Disabled</h1>
    <origo-toggle disabled>
      Toggle
    </origo-toggle>
	`,
};
