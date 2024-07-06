import { ContextProvider, consume, createContext } from "@lit/context";
import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";

type ImageLoadingStatus = "idle" | "loading" | "loaded" | "error";
type ImageLoadingStatusEvent = CustomEvent<ImageLoadingStatus>;

const loadingStatusContext = createContext<ImageLoadingStatus>("idle");

@customElement("origo-avatar")
export class Avatar extends LitElement {
	private _loadingStatusProvider = new ContextProvider(this, {
		context: loadingStatusContext,
	});

	override connectedCallback() {
		super.connectedCallback();

		const avatarImage = this.querySelector("origo-avatar-image");
		if (avatarImage) {
			avatarImage.addEventListener("loading-status-change", (e) => {
				this._loadingStatusProvider.setValue(
					(e as ImageLoadingStatusEvent).detail,
				);
			});
		}
	}

	override render() {
		return html`
			<span part="root">
				<slot></slot>
			</span>
    `;
	}
}

@customElement("origo-avatar-image")
export class AvatarImage extends LitElement {
	@property({ type: String })
	src = "";

	@property({ type: String })
	alt = "";

	@state()
	private _loadingStatus: ImageLoadingStatus = "idle";

	private sendLoadingStatusChangeEvent(status: ImageLoadingStatus) {
		this._loadingStatus = status;
		this.dispatchEvent(
			new CustomEvent("loading-status-change", {
				detail: status,
				bubbles: true,
				composed: true,
			}),
		);
	}

	private onChangeSrc(src: string | null) {
		if (!src) {
			this.sendLoadingStatusChangeEvent("idle");
			return;
		}

		const image = new window.Image();
		image.onload = this.sendLoadingStatusChangeEvent.bind(this, "loaded");
		image.onerror = this.sendLoadingStatusChangeEvent.bind(this, "error");
		image.src = src;
	}

	override attributeChangedCallback(
		name: string,
		old: string | null,
		value: string | null,
	) {
		super.attributeChangedCallback(name, old, value);

		if (name === "src") {
			this.onChangeSrc(value);
		}
	}

	override render() {
		const style =
			this._loadingStatus === "loaded"
				? nothing
				: html`
						<style>
							:host {
								display: none;
							}
						</style>
					`;

		return html`
			${style}
			<img
				part="root"
				src="${this.src}"
				alt="${this.alt}"
			/>
		`;
	}
}

@customElement("origo-avatar-fallback")
export class AvatarFallback extends LitElement {
	@property({ type: Number, attribute: "delay-ms" })
	delayMs?: number;

	@state()
	private _canRender = false;

	@consume({ context: loadingStatusContext, subscribe: true })
	@state()
	private _loadingStatus?: ImageLoadingStatus;

	override connectedCallback(): void {
		super.connectedCallback();

		this._canRender = this.delayMs === undefined;
	}

	private onChangeDelayMs(delayMs?: number) {
		if (delayMs) {
			setTimeout(() => {
				this._canRender = true;
			}, delayMs);
		}
	}

	override attributeChangedCallback(
		name: string,
		old: string | null,
		value: string | null,
	) {
		super.attributeChangedCallback(name, old, value);

		if (name === "delay-ms") {
			this.onChangeDelayMs(value ? Number(value) : undefined);
		}
	}

	override render() {
		const style =
			this._canRender && this._loadingStatus !== "loaded"
				? nothing
				: html`
						<style>
							:host {
								display: none;
							}
						</style>
					`;

		return html`
			${style}
			<span part="root">
				<slot></slot>
			</span>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"origo-avatar": Avatar;
		"origo-avatar-image": AvatarImage;
		"origo-avatar-fallback": AvatarFallback;
	}
}
