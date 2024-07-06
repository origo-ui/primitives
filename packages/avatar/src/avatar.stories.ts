import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

import "./avatar";

const src = "https://picsum.photos/id/1005/400/400";
const srcBroken = "https://broken.link.com/broken-pic.jpg";

const avatarIcon = html`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="42" height="42">
    <path
      d="M50 51.7a22.1 22.1 0 100-44.2 22.1 22.1 0 000 44.2zM87.9 69.3a27.8 27.8 0 00-21.2-16.1 4 4 0 00-2.8.7 23.5 23.5 0 01-27.6 0 4 4 0 00-2.8-.7 27.5 27.5 0 00-21.2 16.1c-.3.6-.2 1.3.1 1.8a52.8 52.8 0 007 8.9 43.4 43.4 0 0056.9 3.8 56.3 56.3 0 008.9-8.8c.9-1.2 1.8-2.5 2.6-3.9.3-.6.3-1.2.1-1.8z"
      fill="currentColor"
    />
  </svg>
`;

interface AvatarProps {
	ratio: number;
}

const meta = {
	title: "Avatar",
	tags: ["autodocs"],
} satisfies Meta<AvatarProps>;

export default meta;
type Story = StoryObj<AvatarProps>;

export const Styled: Story = {
	args: {},
	render: () => html`
		<style>
			origo-avatar::part(root) {
				display: inline-flex;
				align-items: center;
				justify-content: center;
				vertical-align: middle;
				overflow: hidden;
				user-select: none;
				border-radius: 9999px;
				width: 48px;
				height: 48px;
			}

			origo-avatar-image {
				width: 100%;
				height: 100%;
			}

			origo-avatar-image::part(root) {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}

			origo-avatar-fallback {
				width: 100%;
				height: 100%;
			}

			origo-avatar-fallback::part(root) {
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: black;
				color: white;
			}
		</style>

		<h1>Without image & with fallback</h1>
    <origo-avatar>
      <origo-avatar-fallback>JS</origo-avatar-fallback>
    </origo-avatar>

    <h1>With image & with fallback</h1>
    <origo-avatar>
      <origo-avatar-image alt="John Smith" src=${src}></origo-avatar-image>
      <origo-avatar-fallback delay-ms=${300}>
        JS
      </origo-avatar-fallback>
    </origo-avatar>

    <h1>With image & with fallback (but broken src)</h1>
    <origo-avatar>
      <origo-avatar-image
        alt="John Smith"
        src=${srcBroken}
      ></origo-avatar-image>
      <origo-avatar-fallback>
        ${avatarIcon}
      </origo-avatar-fallback>
    </origo-avatar>
	`,
};
