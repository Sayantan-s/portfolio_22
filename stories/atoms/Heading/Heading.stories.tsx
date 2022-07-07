import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { Heading } from ".";
import React from "react";
import { Level } from "./Heading.interface";

const levels: Level[] = ["1", "2", "3", "4", "5", "6"];

export default {
  title: "Atoms/Heading",
  component: Heading,
  argTypes: {
    level: { control: "select", options: levels },
    as: { control: "select", options: levels.map((level) => `h${level}`) },
    onClick: { action: "clicked" },
    isAnimated: { control: "boolean" },
    className: { control: "text" },
  },
} as ComponentMeta<typeof Heading>;

const Component: ComponentStory<typeof Heading> = (args) => (
  <Heading {...args} />
);

export const Default = Component.bind({});
Default.args = {
  children: "There was brown cat",
  level: "1",
};

export const Animated = Component.bind({});
Animated.args = {
  children: "There was brown cat",
  as: "h1",
  level: "1",
  isAnimated: true,
};
