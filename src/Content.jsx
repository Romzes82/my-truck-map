import React from 'react';
import LeftSide from './LeftSide';
import CenterSide from './CenterSide';
import RightSide from './RightSide';

const Content = (props) => {
  const { data } = props;
  return (
      <main className="conteiner">
          <LeftSide data={data} />
          <CenterSide />
          <RightSide data={data} />
      </main>
  );
}

export default Content
