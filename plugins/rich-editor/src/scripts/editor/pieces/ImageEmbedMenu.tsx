/**
 * @copyright 2009-2019 Vanilla Forums Inc.
 * @license GPL-2.0-only
 */

import DropDown, { FlyoutType } from "@library/flyouts/DropDown";
import Button from "@library/forms/Button";
import { ButtonTypes } from "@library/forms/buttonStyles";
import InputTextBlock from "@library/forms/InputTextBlock";
import { accessibleImageMenu } from "@library/icons/common";
import { Devices, useDevice } from "@library/layout/DeviceContext";
import FrameBody from "@library/layout/frame/FrameBody";
import FrameFooter from "@library/layout/frame/FrameFooter";
import { t } from "@library/utility/appUtils";
import { EditorEventWall } from "@rich-editor/editor/pieces/EditorEventWall";
import { embedMenuClasses } from "@rich-editor/editor/pieces/embedMenuStyles";
import classNames from "classnames";
import React, { useCallback, useState, useRef, useEffect } from "react";
import { useLastValue } from "@vanilla/react-utils";

interface IProps extends IImageMeta {
    onSave: (meta: IImageMeta) => void;
    className?: string;
}

export interface IImageMeta {
    alt: string;
}

/**
 * A class for rendering Giphy embeds.
 */
export function ImageEmbedMenu(props: IProps) {
    const classes = embedMenuClasses();
    const icon = accessibleImageMenu();
    const [alt, setAlt] = useState(props.alt);
    const device = useDevice();
    const [isVisible, setVisible] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleTextChange = useCallback(event => {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
            setAlt(event.target.value || "");
        }
    }, []);

    const prevVisibility = useLastValue(isVisible);
    useEffect(() => {
        if (!prevVisibility && isVisible && inputRef.current) {
            inputRef.current && inputRef.current.focus();
        }
    }, [prevVisibility, isVisible, inputRef]);

    return (
        <div
            className={classNames(
                classes.root,
                "u-excludeFromPointerEvents",
                classes.embedMetaDataMenu,
                props.className,
            )}
        >
            <EditorEventWall>
                <DropDown
                    title={t("Alt Text")}
                    buttonContents={icon}
                    className={classNames("u-excludeFromPointerEvents")}
                    onVisibilityChange={setVisible}
                    isVisible={isVisible}
                    openAsModal={device === Devices.MOBILE || device === Devices.XS}
                    flyoutType={FlyoutType.FRAME}
                >
                    {/* We can't use an actual form submit because we're in a nested form. */}
                    <form className={classes.form}>
                        <FrameBody className={classes.verticalPadding}>
                            <InputTextBlock
                                label={t("Alternative text helps users with accessibility concerns and improves SEO.")}
                                labelClass={classes.paragraph}
                                inputProps={{
                                    required: true,
                                    value: alt,
                                    onChange: handleTextChange,
                                    inputRef,
                                    placeholder: t("(Image description)"),
                                }}
                            />
                        </FrameBody>
                        <FrameFooter justifyRight={true}>
                            <Button
                                baseClass={ButtonTypes.TEXT_PRIMARY}
                                onClick={e => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    e.nativeEvent.stopPropagation();
                                    e.nativeEvent.stopImmediatePropagation();
                                    props.onSave({
                                        alt,
                                    });
                                    setVisible(false);
                                }}
                            >
                                {t("Insert")}
                            </Button>
                        </FrameFooter>
                    </form>
                </DropDown>
            </EditorEventWall>
        </div>
    );
}
