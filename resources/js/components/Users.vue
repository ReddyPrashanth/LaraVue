<template>
   <div class="container">
       <div class="row mt-5">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Responsive Hover Table</h3>

                <div class="card-tools">
                  <button class="btn btn-success" data-toggle="modal" data-target="#addNew">Add New <i class="fas fa-user-plus fa-fw"></i></button>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body table-responsive p-0">
                <table class="table table-hover">
                  <tbody><tr>
                    <th>ID</th>
                    <th>User</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Reason</th>
                  </tr>
                  <tr>
                    <td>183</td>
                    <td>John Doe</td>
                    <td>11-7-2014</td>
                    <td><span class="tag tag-success">Approved</span></td>
                    <td>
                        <a href="#">
                            <i class="fas fa-edit blue"></i>
                        </a>
                        /
                        <a href="#">
                            <i class="fas fa-trash red"></i>
                        </a>
                    </td>
                  </tr>
                </tbody></table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
        </div>
        <div class="modal fade" id="addNew" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                         <div class="form-group">
                            <input v-model="form.name" type="text" name="name"
                                class="form-control"
                                :class="{ 'is-invalid': form.errors.has('name') }"
                                placeholder="Name">
                            <has-error :form="form" field="name"></has-error>
                        </div>
                        <div class="form-group">
                            <input v-model="form.email" type="email" name="email"
                                class="form-control"
                                :class="{ 'is-invalid': form.errors.has('email') }"
                                placeholder="Email Address">
                            <has-error :form="form" field="email"></has-error>
                        </div>
                        <div class="form-group">
                            <textarea name="bio"  cols="3"
                            placeholder="Short bio for user(Optiona)"
                            class="form-control"
                            v-model="form.bio" :class="{'is-invalid': form.errors.has('bio')}"></textarea>
                        </div>
                        <div class="form-group">
                            <select class="form-control" v-model="form.type" name="type" :class="{'is-invalid': form.errors.has('type')}">
                                <option value="">Select User Role</option>
                                <option value="admin">Admin</option>
                                <option value="user">Standard User</option>
                                <option value="author">Author</option>
                            </select>
                            <has-error :form="form" field="type"></has-error>
                        </div>
                        <div class="form-group">
                            <input v-model="form.password" type="password" name="password"
                                class="form-control"
                                :class="{ 'is-invalid': form.errors.has('password') }"
                                placeholder="Password">
                            <has-error :form="form" field="password"></has-error>
                        </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
        </div>
   </div>
</template>

<script>
export default {
    data() {
        return {
            form: new Form({
                name: '',
                email: '',
                password: '',
                type: '',
                bio: '',
                photo: ''
            })
        }
    }
}
</script>

<style scoped>

</style>
