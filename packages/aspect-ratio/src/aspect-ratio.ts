import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

const DEFAULT_RATIO = 1 / 1;

@customElement("origo-aspect-ratio")
export class AspectRatio extends LitElement {
	static override styles = css`
    .root {
      position: relative;
			width: 100%;
    }

		.container {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
		}
  `;

	@property({
		type: Number,
		converter: (value) => {
			if (value === null || !value.match(/^-?\d+(\.\d+)?$/)) {
				return DEFAULT_RATIO;
			}
			return Number(value);
		},
	})
	ratio = DEFAULT_RATIO;

	override render() {
		return html`
			<style>
				.root {
					padding-bottom: ${100 / this.ratio}%
				}
			</style>
			<div class="root" part="root">
				<div class="container" part="container">
					<slot></slot>
				</div>
			</div>
    `;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"origo-aspect-ratio": AspectRatio;
	}
}
