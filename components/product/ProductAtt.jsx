import React, { useEffect } from "react";
import ProductAttTypeTextBox from "./ProductAttTypeTextBox";
import ProductAttTypeColor from "./ProductAttTypeColor";
import ProductAttTypeDropdownList from "./ProductAttTypeDropdownList";
import ProductAttTypeRadio from "./ProductAttTypeRadio";
import ProductAttTypeCheckbox from "./ProductAttTypeCheckbox";

export default function ProductAtt({ AttList, setAttObj, attObj, setUnitPrice, autoSelectedPriceAdjustment }) {
  const checkEquals = (a, b) => {
    if (a?.every((v, i) => v === b[i])) {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    AttList?.map((item) => {
      if (item?.hasCondition) {
        if (
          !checkEquals(
            attObj[`product_attribute_${item?.condition?.productAttributeId}`],
            item?.condition?.valuesShouldBeSelected
          )
        ) {
          var newAttObj = attObj;
          delete newAttObj[`product_attribute_${item?.id}`];
          setAttObj(newAttObj);
        }
      }
    });
  }, [attObj]);

  return (
    <div className="flex flex-col gap-2 pb-2">
      {AttList?.map((item) => {
        if (!item?.hasCondition) {
          if (item?.attributeControlType === 1) {
            return (
              <ProductAttTypeDropdownList
                key={item?.id}
                data={item}
                setAttObj={setAttObj}
                attObj={attObj}
                setUnitPrice={setUnitPrice}
                autoSelectedPriceAdjustment={autoSelectedPriceAdjustment?.attType === 1 ? autoSelectedPriceAdjustment : null}
              />
            );
          } else if (item?.attributeControlType === 4) {
            return (
              <ProductAttTypeTextBox
                key={item?.id}
                data={item}
                setAttObj={setAttObj}
                attObj={attObj}
              />
            );
          } else if (item?.attributeControlType === 40) {
            return (
              <ProductAttTypeColor
                key={item?.id}
                data={item}
                setAttObj={setAttObj}
                attObj={attObj}
                setUnitPrice={setUnitPrice}
                autoSelectedPriceAdjustment={autoSelectedPriceAdjustment?.attType === 40 ? autoSelectedPriceAdjustment : null}
              />
            );
          } else if (item?.attributeControlType === 2) {
            return (
              <ProductAttTypeRadio
                key={item?.id}
                data={item}
                setAttObj={setAttObj}
                attObj={attObj}
                setUnitPrice={setUnitPrice}
                autoSelectedPriceAdjustment={autoSelectedPriceAdjustment?.attType === 2 ? autoSelectedPriceAdjustment : null}
              />
            );
          } else if (item?.attributeControlType === 3) {
            return (
              <ProductAttTypeCheckbox
                key={item?.id}
                data={item}
                setAttObj={setAttObj}
                attObj={attObj}
                setUnitPrice={setUnitPrice}
                autoSelectedPriceAdjustment={autoSelectedPriceAdjustment?.attType === 3 ? autoSelectedPriceAdjustment : null}
              />
            );
          }
        } else {
          if (
            attObj[
              `product_attribute_${item?.condition?.product_attribute_id}`
            ] &&
            checkEquals(
              attObj[
                `product_attribute_${item?.condition?.product_attribute_id}`
              ],
              item?.condition?.values_should_be_selected
            )
          ) {
            if (item?.attributeControlType === 1) {
              return (
                <ProductAttTypeDropdownList
                  key={item?.id}
                  data={item}
                  setAttObj={setAttObj}
                  attObj={attObj}
                  setUnitPrice={setUnitPrice}
                  autoSelectedPriceAdjustment={autoSelectedPriceAdjustment?.attType === 1 ? autoSelectedPriceAdjustment : null}
                />
              );
            } else if (item?.attributeControlType === 4) {
              return (
                <ProductAttTypeTextBox
                  key={item?.id}
                  data={item}
                  setAttObj={setAttObj}
                  attObj={attObj}
                />
              );
            } else if (item?.attributeControlType === 40) {
              return (
                <ProductAttTypeColor
                  key={item?.id}
                  data={item}
                  setAttObj={setAttObj}
                  attObj={attObj}
                  setUnitPrice={setUnitPrice}
                  autoSelectedPriceAdjustment={autoSelectedPriceAdjustment?.attType === 40 ? autoSelectedPriceAdjustment : null}
                />
              );
            } else if (item?.attributeControlType === 2) {
              return (
                <ProductAttTypeRadio
                  key={item?.id}
                  data={item}
                  setAttObj={setAttObj}
                  attObj={attObj}
                  setUnitPrice={setUnitPrice}
                  autoSelectedPriceAdjustment={autoSelectedPriceAdjustment?.attType === 2 ? autoSelectedPriceAdjustment : null}
                />
              );
            } else if (item?.attributeControlType === 3) {
              return (
                <ProductAttTypeCheckbox
                  key={item?.id}
                  data={item}
                  setAttObj={setAttObj}
                  attObj={attObj}
                  setUnitPrice={setUnitPrice}
                  autoSelectedPriceAdjustment={autoSelectedPriceAdjustment?.attType === 3 ? autoSelectedPriceAdjustment : null}
                />
              );
            }
          }
        }
      })}
    </div>
  );
}
