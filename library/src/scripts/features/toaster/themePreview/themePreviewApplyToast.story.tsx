/**
 * @copyright 2009-2019 Vanilla Forums Inc.
 * @license GPL-2.0-only
 */

import { StoryContent } from "@library/storybook/StoryContent";
import { StoryHeading } from "@library/storybook/StoryHeading";
import { storiesOf } from "@storybook/react";
import React from "react";
import Toast from "../Toast";
import { ButtonTypes } from "@library/forms/buttonStyles";
import { LoadStatus } from "@library/@types/api/core";

const formsStory = storiesOf("Toast", module);

formsStory.add("Toast/ThemePreview/Apply", () =>
    (() => {
        return (
            <>
                <StoryContent>
                    <StoryHeading depth={1}>Theme preview toast: Apply loading</StoryHeading>
                </StoryContent>
                <Toast
                    links={[
                        {
                            name: "Apply",
                            type: ButtonTypes.TEXT,
                            isLoading: true,
                        },
                        {
                            name: "Cancel",
                            type: ButtonTypes.TEXT_PRIMARY,
                        },
                    ]}
                    message={
                        <>
                            You are previewing the <b>Foundation</b> theme.
                        </>
                    }
                />
            </>
        );
    })(),
);
