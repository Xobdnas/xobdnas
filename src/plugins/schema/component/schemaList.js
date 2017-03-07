import React from 'react';
import {Link} from 'react-router';
import {Button, Icon, Table} from 'semantic-ui-react';


export default class SchemaList extends React.Component {
  state = {
    schemas: [],
  };

  componentDidMount() {
    const schemaUrl = `/api/schema/`;
    fetch(schemaUrl)
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then((list) => {
        this.setState({schemas: list});
      });
  }

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-10">
          <div className="login-panel panel panel-default">
            <div className="panel-heading">
            </div>
            <div className="panel-body">
              <Table celled striped>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell colSpan='3'>Schemas
                      <Button as={Link} to="/schema/add" floated='right' icon labelPosition='left' primary size='small'>
                        <Icon name='add' /> Add Schema
                      </Button>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {
                    this.state.schemas.map(function(schema) {
                      return (
                        <Table.Row key={schema.id}>
                          <Table.Cell collapsing>
                           <Link to={`/add/${schema.name}`}>{schema.name}</Link>
                          </Table.Cell>
                          <Table.Cell>{schema.form_schema.description}</Table.Cell>
                          <Table.Cell collapsing textAlign='right'>
                            <Button label='Edit' icon='edit' labelPosition='left' size="mini" />
                            <Button label="Delete" icon='delete' labelPosition='left' size="mini" />
                          </Table.Cell>
                        </Table.Row>
                      );
                    })
                  }
                </Table.Body>
              </Table>

            </div>
          </div>
        </div>
      </div>
    );
  }
}