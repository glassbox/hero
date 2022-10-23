/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Todo } from "../models";
import {
  getOverrideProps,
  useDataStoreBinding,
} from "@aws-amplify/ui-react/internal";
import WorkItemCard1 from "./WorkItemCard1";
import { Collection } from "@aws-amplify/ui-react";
export default function WorkItemCollection(props) {
  const { items: itemsProp, overrideItems, overrides, ...rest } = props;
  const itemsDataStore = useDataStoreBinding({
    type: "collection",
    model: Todo,
  }).items;
  const items = itemsProp !== undefined ? itemsProp : itemsDataStore;
  return (
    <Collection
      type="list"
      direction="column"
      justifyContent="left"
      items={items || []}
      {...rest}
      {...getOverrideProps(overrides, "WorkItemCollection")}
    >
      {(item, index) => (
        <WorkItemCard1
          todo={item}
          key={item.id}
          {...(overrideItems && overrideItems({ item, index }))}
        ></WorkItemCard1>
      )}
    </Collection>
  );
}
