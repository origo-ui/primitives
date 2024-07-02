import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

const ORIENTATIONS = ["horizontal", "vertical"] as const;
type Orientation = (typeof ORIENTATIONS)[number];

const DEFAULT_ORIENTATION: Orientation = "horizontal" as const;

function isValidOrientation(orientation: string): orientation is Orientation {
	return (ORIENTATIONS as readonly string[]).includes(orientation);
}

@customElement("origo-separator")
export class Separator extends LitElement {
	@property({
		type: String,
		converter: (value) => {
			if (value === null) {
				return DEFAULT_ORIENTATION;
			}
			return isValidOrientation(value) ? value : DEFAULT_ORIENTATION;
		},
	})
	orientation = DEFAULT_ORIENTATION;

	override render() {
		return html`
			<div
				part="root"
				aria-orientation=${this.orientation}
				role='separator'
			>
			</div>
    `;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"origo-separator": Separator;
	}
}
