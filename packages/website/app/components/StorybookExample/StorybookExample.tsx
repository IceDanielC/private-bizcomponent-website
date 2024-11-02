import React from 'react';
import { Button, Flex } from '@private-basic-components';
import { StorybookExampleProps } from './interface';

const StorybookExample: React.FC<StorybookExampleProps> = () => {
  return (
    <>
      <Flex vertical>
        <div className="m-4 p-4 bg-red-500  text-white">storybook example</div>
        <Button type="primary">StorybookExample</Button>
      </Flex>
    </>
  );
};

export default StorybookExample;
