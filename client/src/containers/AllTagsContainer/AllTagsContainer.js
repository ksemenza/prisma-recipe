import React, {Component, Fragment} from 'react'
import { graphql }  from 'react-apollo'
import {Card, Col, Row, Empty, Spin} from 'antd'


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

      _updateRecipe = ({
        id,
        name,
        isPublished
      }) => {
        this.props
          .updateRecipeMutation({
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
            if (res.data.updateRecipe.id) {
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
                        message: `recipe ${title} ${action} successfully`,
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
    

    render(){

        const {loading, tags} = this.data.props

        return(
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
            </div>
        )

    }
} 

graphql(GetAllPublishedTags)(AllTagsContainer)