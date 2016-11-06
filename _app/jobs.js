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
  componentDidMount: function () {
    var self = this;
    return axios.get('https://api.trello.com/1/boards/hgNZ59E5/cards?fields=id,name,desc,labels')
      .then(function (res) {
        var jobsData = [];
        res.data.forEach(function (item) {
          var descSplit = item.desc.split('\n');
          jobsData.push({
            id: item.id,
            name: item.name,
            link: descSplit[0],
            company: descSplit[1],
            companyLink: descSplit[2],
            tags: item.labels,
          });
        });

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
          <div className="col-md-6 jobBoard-item-title">
            <a href={ item.link } target="_blank">{ item.name }</a>
          </div>
          <div className="col-md-3 jobBoard-item-company">
            <a href={ item.companyLink } target="_blank">{ item.company }</a>
          </div>
          <div className="col-md-3 jobBoard-item-tags text-right">
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
