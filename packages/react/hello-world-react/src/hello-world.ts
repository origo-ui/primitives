import { createComponent } from "@lit/react";
import * as React from "react";

import { HelloWorld as HelloWorldWC } from "@origo-ui/hello-world";

export const HelloWorld = createComponent({
	react: React,
	tagName: "hello-world",
	elementClass: HelloWorldWC,
	displayName: "HellWorld",
});
