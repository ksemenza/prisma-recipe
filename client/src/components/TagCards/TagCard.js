import React, { Fragment } from 'react';
import {Popconfirm, Card} from 'antd'
import Icon from '@ant-design/icons';



const TagCard = ({
  title,
  content,
  id,
  handleOnClick,
  handleOnEdit,
  handleOnDelete,
  name,
  isPublished
}) => {
  return (
    <Card
      // hoverable
      title={title}
      bordered={false}
      extra={
        <Fragment>
          <span
            className="pointer"
            onClick={() =>
              handleOnEdit({ id, name, isPublished })
            }
          >
            <Icon
              style={{
                fontSize: '1.25rem',
                color: '#08c',
                marginRight: '0.625rem'
              }}
              type="edit"
            />
          </span>
          <Popconfirm
            title="Are you sure delete this tag?"
            onConfirm={() =>
              handleOnDelete({
                id,
                name
              })
            }
            okText="Yes"
            cancelText="No"
          >
            <span className="pointer">
              <Icon
                style={{
                  fontSize: '1.25rem',
                  color: '#08c',
                  marginRight: '0.625rem'
                }}
                type="delete"
              />
            </span>
          </Popconfirm>
          <span className="pointer">
            <Icon
              style={{
                fontSize: '1.25rem',
                color: '#08c'
              }}
              type="eye"
              onClick={() => handleOnClick(id)}
            />
          </span>
        </Fragment>
      }
      style={{
        marginBottom: '50px'
      }}
    >
      {content}
    </Card>
  );
};

export default TagCard;