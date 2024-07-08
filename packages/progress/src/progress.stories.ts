import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import "./progress";

interface ProgressProps {
	name: string;
	count: number;
}

const meta = {
	title: "Progress",
	tags: ["autodocs"],
} satisfies Meta<ProgressProps>;

export default meta;
type Story = StoryObj<ProgressProps>;

export const Styled: Story = {
	args: {},
	render: () => html`
		<style>
			origo-progress::part(root) {
				width: 400px;
				height: 20px;
				max-width: 100%;
				border: 5px solid black;
				background-color: #e0e0e0;
			}

			origo-progress-indicator::part(root) {
				height: 100%;
				background-color: red;
				transition: background 150ms ease-out;
			}

			origo-progress-indicator:not([data-value])::part(root) {
				width: 10%;
			}

			origo-progress-indicator[data-value="30"]::part(root) {
				width: 30%;
			}

			origo-progress-indicator[data-value="100"]::part(root) {
				width: 100%;
			}

			origo-progress-indicator[data-state="indeterminate"]::part(root) {
				background-color: gray;
			}

			origo-progress-indicator[data-state="complete"]::part(root) {
				background-color: green;
			}
		</style>

		<h1>Indeterminate</h1>
		<origo-progress>
			<origo-progress-indicator></origo-progress-indicator>
		</origo-progress>

		<h1>Loading</h1>
		<origo-progress value="30">
			<origo-progress-indicator></origo-progress-indicator>
		</origo-progress>

		<h1>Complete</h1>
		<origo-progress value="100">
			<origo-progress-indicator></origo-progress-indicator>
		</origo-progress>
	`,
};
