/**
 * @fileOverview Jobs board scripts.
 */

var React = require('react');
var axios = require('axios');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      jobs: [],
    };
  },
  sanitizeLink: function (link) {
    if (link.substr(0, 7) === 'http://' || link.substr(0, 8) === 'https://') {
      return link;
    } else {
      return 'http://' + link;
    }
  },
  processTrelloResponse: function (trelloData) {
    var jobsData = [];
    var self = this;
    trelloData.forEach(function (item) {
      var descSplit = item.desc.split('\n');
      jobsData.push({
        id: item.id,
        name: item.name,
        link: self.sanitizeLink(descSplit[0]),
        company: descSplit[1],
        companyLink: self.sanitizeLink(descSplit[2]),
        tags: item.labels,
      });
    });

    return jobsData;
  },
  componentDidMount: function () {
    var self = this;
    return axios.get('https://api.trello.com/1/boards/hgNZ59E5/cards?fields=id,name,desc,labels')
      .then(function (res) {
        var jobsData = self.processTrelloResponse(res.data);
        self.setState({
          jobs: jobsData,
        });
      });
  },
  render: function () {
    var createJobItem = function (item) {
      var listItems = item.tags.map(function (tag) {
        return (
          <li key={ tag.id }>{ tag.name }</li>
        );
      });
      return (
        <div className="jobBoard-item" key={ item.id }>
          <div className="col-md-5 col-xs-12 jobBoard-item-title">
            <a href={ item.link } target="_blank">{ item.name }</a>
          </div>
          <div className="col-md-3 col-xs-6 jobBoard-item-company">
            <a href={ item.companyLink } target="_blank">{ item.company }</a>
          </div>
          <div className="col-md-4 col-xs-6 jobBoard-item-tags text-right">
            <ul>{ listItems }</ul>
          </div>
        </div>
      );
    };
    return (
      <div className="col-md-12 jobBoard">
        { this.state.jobs.map(createJobItem) }
      </div>
    );
  },
});
