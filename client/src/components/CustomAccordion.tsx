import { isEmpty } from "lodash";
import React, { useContext } from "react";
import { Accordion, AccordionContext } from "react-bootstrap";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Card from "react-bootstrap/Card";
import { FiChevronRight, FiChevronDown } from "react-icons/fi";

interface ICustomProps {
  children: string;
  eventKey: string;
}

interface IProps {
  itemsArray: {
    question: string;
    answer: string;
  }[];
}

const CustomAccordion = ({ itemsArray }: IProps) => {
  function CustomToggle({ children, eventKey }: ICustomProps) {
    const { activeEventKey } = useContext(AccordionContext);
    const decoratedOnClick = useAccordionButton(eventKey);
    const isCurrentEventKey = activeEventKey === eventKey;
    return (
      <div
        className="card-title-button d-flex justify-content-between align-items-start cursor-pointer"
        onClick={decoratedOnClick}
      >
        <div
          className={`card-header-text ${
            isCurrentEventKey ? "active" : "non-active"
          }`}
        >
          {children}
        </div>
        <div
          className={`card-header-icon ${
            isCurrentEventKey ? "active" : "non-active"
          }`}
        >
          {isCurrentEventKey ? (
            <FiChevronDown size={20} />
          ) : (
            <FiChevronRight size={20} />
          )}
        </div>
      </div>
    );
  }

  return (
    <Accordion defaultActiveKey="0" className="tg-accordion">
      {!isEmpty(itemsArray) &&
        itemsArray.map(
          (item: { question: string; answer: string }, i: number) => {
            return (
              <Card key={i}>
                <Card.Header>
                  <CustomToggle eventKey={i.toString()}>
                    {item.question}
                  </CustomToggle>
                </Card.Header>
                <Accordion.Collapse eventKey={i.toString()}>
                  <Card.Body
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                  ></Card.Body>
                </Accordion.Collapse>
              </Card>
            );
          }
        )}
    </Accordion>
  );
};

export default CustomAccordion;
