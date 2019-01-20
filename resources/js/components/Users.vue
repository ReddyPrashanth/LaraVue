<template>
   <div class="container">
       <div class class="row mt-4" v-if="!$gate.isAdmin()">
           <not-found></not-found>
       </div>
       <div class="row mt-4" v-if="$gate.isAdmin()">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Responsive Hover Table</h3>

                <div class="card-tools">
                  <button class="btn btn-success" @click="addModal">Add New <i class="fas fa-user-plus fa-fw"></i></button>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body table-responsive p-0">
                <table class="table table-hover">
                  <tbody><tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Type</th>
                    <th>Created At</th>
                    <th>Action</th>
                  </tr>
                  <tr v-for="user in users.data" :key="user.id">
                    <td>{{user.id}}</td>
                    <td>{{user.name}}</td>
                    <td>{{user.email}}</td>
                    <td>{{user.type | upText}}</td>
                    <td>{{user.created_at | date}}</td>
                    <td>
                        <a href="#" @click="editModal(user)">
                            <i class="fas fa-edit blue"></i>
                        </a>
                        /
                        <a href="#" @click="deleteUser(user.id)">
                            <i class="fas fa-trash red"></i>
                        </a>
                    </td>
                  </tr>
                </tbody></table>
              </div>
              <!-- /.card-body -->
              <div class="card-footer">
                  <pagination :data="users" @pagination-change-page="getResults"></pagination>
              </div>
            </div>
            <!-- /.card -->
          </div>
        </div>
        <div class="modal fade" id="addNew" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle" v-show="!editMode">Add New</h5>
                    <h5 class="modal-title" id="exampleModalLongTitle" v-show="editMode">Update User Info</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="editMode ? updateUser() : createUser()">
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
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary" v-show="!editMode">Add</button>
                            <button type="submit" class="btn btn-primary" v-show="editMode">Update User</button>
                        </div>
                    </form>

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
            editMode: false,
            users: {},
            form: new Form({
                id: '',
                name: '',
                email: '',
                password: '',
                type: '',
                bio: '',
                photo: ''
            })
        };
    },
    methods: {
        getResults(page=1){
            axios.get('api/user?page=' + page)
				.then(response => {
					this.users = response.data;
				});
        },
        addModal() {
            this.editMode = false;
            this.form.reset();
            $('#addNew').modal('show');
        },
        editModal(user) {
            this.editMode = true;
             this.form.reset();
             $('#addNew').modal('show');
             this.form.fill(user);
        },
        deleteUser(id){
            Swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                if (result.value) {
                    this.form.delete('api/user/'+id)
                        .then(() => {
                            eventBus.$emit('afterCreate');
                            Swal(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                            )
                        }).catch(() => {
                            Swal(
                            'Failed!',
                            'There was something wrong.',
                            'warning'
                            )
                        })

                }
                })
        },
        updateUser() {
            this.$Progress.start()
            this.form.put('api/user/'+this.form.id)
                .then(() => {
                    $('#addNew').modal('hide');
                     eventBus.$emit('afterCreate');
                            Swal(
                            'Updated!',
                            'User has been Updated.',
                            'success'
                            )
                    this.$Progress.finish();

                }).catch(error => {
                    this.$Progress.fail();
                });
        },
        createUser() {
            this.$Progress.start();
            this.form.post('api/user')
                .then(() => {
                    eventBus.$emit('afterCreate');
                    $('#addNew').modal('hide')
                    toast({
                        type: 'success',
                        title: 'User Created successfully'
                        })
                    this.$Progress.finish();
                })
                .catch((error) => {
                    this.$Progress.fail();
                })

        },
        getUsers() {
            if(this.$gate.isAdmin()){
                axios.get('api/user').then(res => {
                    console.log(res.data.data);
                    this.users = res.data;
                });
            }
        }
    },
    created() {
         this.getUsers();
        eventBus.$on('afterCreate', () => this.getUsers());
        eventBus.$on('searching', () => {
            let query = 'api/findUser?q='+this.$parent.search;
            axios.get(query)
                .then(res => {
                    this.users = res.data;
                }).catch(error => {
                    console.log(error);
                })
        })
    }
}
</script>

<style scoped>

</style>
