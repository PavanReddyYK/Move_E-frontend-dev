import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Col, Row } from "react-bootstrap";

const CardSkeleton = () => {
  return (
    <Row>
      <Col md={6}>
        <Row>
          <Skeleton width={100} />
          <Skeleton height={50} />
        </Row>
        <Row>
          <Skeleton width={100} />
          <Skeleton height={50} />
        </Row>
        <Row>
          <Skeleton width={100} />
          <Skeleton height={50} />
        </Row>
        <Row>
          <Skeleton width={100} />
          <Skeleton height={50} />
        </Row>
      </Col>
      <Col md={6}>
        <Row>
          <Skeleton width={100} />
          <Skeleton height={50} />
        </Row>
        <Row>
          <Skeleton width={100} />
          <Skeleton height={50} />
        </Row>
      </Col>
      <Row>
        <Skeleton height={50} />
      </Row>
    </Row>
  );
};

export default CardSkeleton;
