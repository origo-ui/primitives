import { screen } from "@testing-library/dom";
import { describe, expect, it } from "vitest";

import "./separator";

describe("separator", () => {
	it("renders horizontal separator when no orientation is set", async () => {
		document.body.innerHTML = "<origo-separator></origo-separator>";
		await customElements.whenDefined("origo-separator");

		const separator = screen.getByRole("separator");
		expect(separator.getAttribute("data-orientation")).toBe("horizontal");
		expect(separator.getAttribute("aria-orientation")).toBe("horizontal");
	});

	it("renders horizontal separator when orientation is set to `horizontal`", async () => {
		document.body.innerHTML =
			'<origo-separator orientation="horizontal"></origo-separator>';
		await customElements.whenDefined("origo-separator");

		const separator = screen.getByRole("separator");
		expect(separator.getAttribute("data-orientation")).toBe("horizontal");
		expect(separator.getAttribute("aria-orientation")).toBe("horizontal");
	});

	it("renders vertical separator when orientation is set to `vertical`", async () => {
		document.body.innerHTML =
			'<origo-separator orientation="vertical"></origo-separator>';
		await customElements.whenDefined("origo-separator");

		const separator = screen.getByRole("separator");
		expect(separator.getAttribute("data-orientation")).toBe("vertical");
		expect(separator.getAttribute("aria-orientation")).toBe("vertical");
	});

	it("renders horizontal separator when orientation is set to invalid value", async () => {
		document.body.innerHTML =
			'<origo-separator orientation="invalid"></origo-separator>';
		await customElements.whenDefined("origo-separator");

		const separator = screen.getByRole("separator");
		expect(separator.getAttribute("data-orientation")).toBe("horizontal");
		expect(separator.getAttribute("aria-orientation")).toBe("horizontal");
	});
});
