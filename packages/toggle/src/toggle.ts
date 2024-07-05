import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("origo-toggle")
export class Toggle extends LitElement {
	@property({ type: Boolean, reflect: true })
	pressed = false;

	@property({ type: Boolean })
	disabled?: boolean;

	private _togglePressed() {
		this.pressed = !this.pressed;
	}

	override render() {
		return html`
			<button
				part="root"
				aria-pressed=${this.pressed}
				?disabled=${this.disabled}
				@click=${this._togglePressed}
			>
				<slot></slot>
			</button>
    `;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"origo-toggle": Toggle;
	}
}
