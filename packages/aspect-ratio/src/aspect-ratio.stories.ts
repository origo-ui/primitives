import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import "./aspect-ratio";

interface AspectRatioProps {
	ratio: number;
}

const meta = {
	title: "AspectRatio",
	tags: ["autodocs"],
} satisfies Meta<AspectRatioProps>;

export default meta;
type Story = StoryObj<AspectRatioProps>;

const image = html`
	<img
		src="https://images.unsplash.com/photo-1605030753481-bb38b08c384a?&auto=format&fit=crop&w=400&q=80"
    alt="A house in a forest"
    style="object-fit: cover; width: 100%; height: 100%"
	/>
`;

export const Styled: Story = {
	args: {},
	render: () => html`
		<style>

		</style>

		<div style="width: 500px;">
			<origo-aspect-ratio>
				<h1>Default ratio (1/1)</h1>
			</origo-aspect-ratio>
		</div>
	`,
};

export const CustomRatios: Story = {
	render: () => html`
		<div style="display: flex; gap: 20px;">
			<div style="width: 200px;">
				<origo-aspect-ratio ratio="${1 / 2}">
					${image}
				</origo-aspect-ratio>
			</div>
			<div style="width: 200px;">
				<origo-aspect-ratio>
					${image}
				</origo-aspect-ratio>
			</div>
			<div style="width: 200px;">
				<origo-aspect-ratio ratio="${16 / 9}">
					${image}
				</origo-aspect-ratio>
			</div>
			<div style="width: 200px;">
				<origo-aspect-ratio ratio="${2 / 1}">
					${image}
				</origo-aspect-ratio>
			</div>
		</div>
	`,
};
