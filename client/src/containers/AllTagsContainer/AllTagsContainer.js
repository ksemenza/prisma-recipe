import React, {Component, Fragment} from 'react'
import { graphql, compose, withApollo }  from 'react-apollo'
import {Card, Col, Row, Empty, Spin, Button, notification} from 'antd'


//queries
import GetAllPublishedTags from '../../graphql/queries/GetAllPublishedTags'
import GetSingleTag from '../../graphql/queries/GetSingleTag'
//componenet
import TagCard from '../../components/TagCards/TagCard'
import AddTagModal from '../../components/modals/AddTagModal'
import ViewTagModal from '../../components/modals/ViewTagModals'
//mutations
import UpdateTag from '../../graphql/mutations/UpdateTag'
import AddNewTag from '../../graphql/mutations/AddNewTag'

const initialState = {
    form: {
        name:'',
        isPublished:false
    },
    notification: {
        notificationOpen:false,
        message:'',
        title:'',
        type:''
    },
    viewModalOpen: false,
    addModalOpen:false,
    tagData: {},
    tagId: '',
    isEditing:false
}


class AllTagsContainer extends Component {
    state = initialState


    _handleResetState = () => {
        this.setState({ ...initialState });
      };
    
      _handleChange = event => {
        event.persist();
    
        this.setState((prevState, nextProps) => ({
          form: { ...prevState.form, [event.target.name]: event.target.value }
        }));
      };
    
      _handleChecked = checked => {
        this.setState((prevState, nextProps) => ({
          form: { ...prevState.form, isPublished: checked }
        }));
      };

      _handleOnClick = TagId => {
        this.props.client
          .query({
            query: GetSingleTag,
            variables: {
              TagId
            }
          })
          .then(res => {
            this.setState((prevState, nextProps) => ({
              viewModalOpen: true,
              tagData: res.data.tag
            }));
          });
      };
    
      _handleOpenAddModal = () => {
        this.setState((prevState, nextProps) => ({
          addModalOpen: true
        }));
      };
    
      _handleOnEdit = ({ id, name, isPublished }) => {
        this.setState((prevState, nextProps) => ({
          form: {
            name,
            isPublished
          },
          modalOpen: true,
          isEditing: true,
          tagId: id
        }));
      };

      _handleCloseModal = () => {
        this.setState((prevState, nextProps) => ({
          viewModalOpen: false,
          isEditing: false,
          addModalOpen: false
        }));
      };

      _updateTag = ({
        id,
        name,
        isPublished,
        action
      }) => {
        this.props
          .updateTagMutation({
            variables: {
              id,
              name,
              isPublished
            
            },
            refetchQueries: [
              {
                query: GetAllPublishedTags
              }
            ]
          })
          .then(res => {
            if (res.data.updateTag.id) {
              this.setState(
                (prevState, nextProps) => ({
                  isEditing: false
                }),
                () =>
                  this.setState(
                    (prevState, nextProps) => ({
                      notification: {
                        notificationOpen: true,
                        type: 'success',
                        message: `tag ${name} ${action} successfully`,
                        title: 'Success'
                      }
                    }),
                    () => this._handleResetState()
                  )
              );
            }
          })
          .catch(e => {
            this.setState((prevState, nextProps) => ({
              notification: {
                ...prevState.notification,
                notificationOpen: true,
                type: 'error',
                message: e.message,
                title: 'Error Occured'
              }
            }));
          });
      };
    
      _handleOnDelete = ({ id, name }) => {
        this._updateTag({
          id,
          name,
          isPublished: false,
          action: 'deleted'
        });
      };
    
      _handleSubmit = event => {
        const { name,isPublished } = this.state.form;
        const { tagId, isEditing } = this.state;
    
        if (isEditing) {
          this._updateTag({
            id: tagId,
            name,        
            isPublished,
            action: 'edited'
          });
        } else {
          this.props
            .addNewRecipeMutation({
              variables: {
                name,
                isPublished
              },
              refetchQueries: [
                {
                  query: GetAllPublishedTags
                }
              ]
            })
            .then(res => {
              if (res.data.createTag.id) {
                this.setState(
                  (prevState, nextProps) => ({
                    addModalOpen: false
                  }),
                  () =>
                    this.setState(
                      (prevState, nextProps) => ({
                        notification: {
                          notificationOpen: true,
                          type: 'success',
                          message: `recipe ${name} added successfully`,
                          title: 'Success'
                        }
                      }),
                      () => this._handleResetState()
                    )
                );
              }
            })
            .catch(e => {
              this.setState((prevState, nextProps) => ({
                notification: {
                  ...prevState.notification,
                  notificationOpen: true,
                  type: 'error',
                  message: e.message,
                  title: 'Error Occured'
                }
              }));
            });
        }
      };
    
      _renderNotification = () => {
        const { notificationOpen, type, title, message } = this.state.notification;
    
        if (notificationOpen) {
          notification[type]({
            message: title,
            description: message
          });
        }
      };

    render(){

        const {loading, tags} = this.data.props
        const {viewModalOpen, tagData, isEditing, addModalOpen} = this.state

        return(
               <Fragment>
        <ViewTagModal
          handleCloseModal={this._handleCloseModal}
          modalOpen={viewModalOpen}
          tag={tagData}
        />
            <div>
                {loading ? (
                    <div className='spin-container'>
                        <Spin/>
                        </div>
                ): tags.length > 0 ? (
                    <Row gutter={16}>
                        {tags.map(tag => (
                            <Col span={6} key={tag.id}>
                                <TagCard
                                name={tag.name}
                                content={
                                    <Fragment>
                                        <Card
                                        type="inner"
                                        title="Tag"
                                        style={{marginBottom:'15px'}}>
                                            {`${tag.name.substring(0,75)}....`}
                                        </Card>
                                    </Fragment>
                                }
                                handleOnClick={this._handleOnClick}
                                handleOnEdit={this._handleOnEdit}
                                handleOnDelete={this._handleOnDelete}
                                {...tag}
                                />
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <Empty/>
                )
            }
                 <AddTagModal
            modalOpen={addModalOpen || isEditing}
            handleCloseModal={this._handleCloseModal}
            handleSubmit={this._handleSubmit}
            handleChecked={this._handleChecked}
            handleChange={this._handleChange}
            {...this.state.form}
          />
                   <div className="fab-container">
            <Button
              type="primary"
              shape="circle"
              icon="plus"
              size="large"
              onClick={this._handleOpenAddModal}
            />
          </div>
          </div>
          {this._renderNotification()}

      </Fragment>
        )

    }
} 


export default compose(
  graphql(UpdateTag, { name: 'updateTagMutation' }),
  graphql(AddNewTag, { name: 'addNewTagMutation' }),
  graphql(GetAllPublishedTags)
)(withApollo(AllTagsContainer))