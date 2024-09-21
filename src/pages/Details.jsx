import React from "react";
import { Link } from "react-router-dom";
import { List } from "../components/commons/List";
import { Tile } from "../components/commons/Tile";

export const Details = ({ alles }) => {
  return (
    <>
      <ul className="poster">
        <Tile item={"x"} />
        <li>
          <h2>Social Net</h2>
        </li>
      </ul>
      <div className="details">
        <h1 className="details-title">title</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis
          facere ex laudantium voluptas iste dolorem at veritatis quam aliquid
          dolore quidem dolorum impedit, tempora praesentium? Eius tenetur
          expedita nisi ullam.
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis
          quibusdam debitis aliquid harum aliquam, iure similique ut itaque
          explicabo! Molestiae temporibus laboriosam aut unde debitis corrupti
          doloribus fuga sed accusamus!
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam
          minus veniam facere, voluptates quae natus ipsa tempora! Eligendi nemo
          expedita quas id est, enim quidem accusantium laudantium ad optio
          ducimus.
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis
          quibusdam debitis aliquid harum aliquam, iure similique ut itaque
          explicabo! Molestiae temporibus laboriosam aut unde debitis corrupti
          doloribus fuga sed accusamus!
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam
          minus veniam facere, voluptates quae natus ipsa tempora! Eligendi nemo
          expedita quas id est, enim quidem accusantium laudantium ad optio
          ducimus.
        </p>
      </div>
      <h2 className="related-title">Title</h2>
      <div className="related-container">
        <List alles={alles} />
      </div>
    </>
  );
};
