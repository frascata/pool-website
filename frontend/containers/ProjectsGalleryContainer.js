import React from 'react';
import { connect } from 'react-redux';

import * as projectActions from '../actions/projectActions';
import * as categoryActions from '../actions/categoryActions';

import ProjectGallery from '../components/ProjectGallery';


@connect(state => ({
  projects: state.projects,
  categories: state.categories,
}))
export default class ProjectsGalleryContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedProject: null,
      selectedCategory: null,
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentDidMount() {
    let {dispatch, projects, categories} = this.props;
    if (!projects.isLoadingProjects && projects.items === undefined) {
      try {
        let urlParams = new URLSearchParams(window.location.search);
        let categoryParam = urlParams.get('category');
        if (categoryParam) {
          this.filterProject(categoryParam);
        }
        else {
          dispatch(projectActions.fetchProjects());
        }
      } catch (err) {
        console.error(err);
        dispatch(projectActions.fetchProjects());
      }
    }
    if (!categories.isLoadingCategories && categories.items === undefined) {
      dispatch(categoryActions.fetchCategories());
    }
  }

  openProject(project) {
    window.location.href = `${window.location.origin}/${project.url}`;
  }

  filterProject(categoryId) {
    let {dispatch} = this.props;
    this.setState({selectedCategory: categoryId});
    return dispatch(projectActions.filterProjectsByCategory(categoryId));
  }

  renderProjects() {
    if (this.props.projects.items !== undefined) {
      return this.props.projects.items.map((project) => {
        return <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3"
                    key={project.id}
                    onClick={this.openProject.bind(this, project)}>
          <ProjectGallery key={project.id} project={project}/>
        </div>;
      });
    }
  }

  renderCategories() {
    if (this.props.categories.items !== undefined) {
      return this.props.categories.items.map((category, index) => {

        let categoryClassName = category.id === null
          ? 'category-item active'
          : 'category-item';

        if (this.state.selectedCategory) {
          categoryClassName = category.id ===
          parseInt(this.state.selectedCategory)
            ? 'category-item active'
            : 'category-item';
        }

        return <a className={categoryClassName} key={category.id}
                  onClick={this.filterProject.bind(this, category.id)}>
          {index !== 0 ? <span className="category-divider">|</span> : null}
          <span>{category.title}</span>
        </a>;
      });
    }
  }

  handleSelectChange(event) {
    this.filterProject(event.target.value || null);
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="row">
            <div className="col-sm-12">
              <div className="row">
                <div className="col-sm-12">
                  <div className="category-filters">
                    {this.renderCategories()}
                  </div>
                </div>
              </div>
              <div className="row">
                {this.renderProjects()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
