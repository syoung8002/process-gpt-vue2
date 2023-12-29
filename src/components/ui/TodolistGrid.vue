<template>
    <div>
        <!-- <v-snackbar
                v-model="snackbar.status"
                :timeout="snackbar.timeout"
                :color="snackbar.color"
        >
            <v-btn @click="snackbar.status = false" variant="text">
                Close
            </v-btn>
        </v-snackbar> -->

        <div class="mb-3">
            <v-btn @click="openDialog"
                    color="blue"
                    class="mr-2"
                    depressed
                    dark
            >
                <v-icon left>mdi-plus</v-icon>
                등록
            </v-btn>

            <v-btn @click="openDialog" 
                    color="blue"
                    class="mr-2"
                    depressed
                    dark
            >
                <v-icon left>mdi-pencil</v-icon>
                수정
            </v-btn>
            
            <v-btn @click="updateTodolistDialog = true" 
                    color="blue"
                    depressed
                    dark
            >
                <v-icon left>mdi-minus-circle-outline</v-icon>
                Todolist 업데이트
            </v-btn>
        </div>
        
        <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>액티비티 ID</th>
                        <th>액티비티명</th>
                        <th>시작일</th>
                        <th>완료일</th>
                        <th>마감일</th>
                        <th>프로세스 정의 ID</th>
                        <th>프로세스 인스턴스 ID</th>
                        <th>사용자 ID</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(val, idx) in value" 
                            :key="val"
                            @click="goInstance(val.processInstanceId)"
                    >
                        <td>{{ idx + 1 }}</td>
                        <td>{{ val.activityId }}</td>
                        <td>{{ val.activityName }}</td>
                        <td>{{ val.startDate }}</td>
                        <td>{{ val.endDate }}</td>
                        <td>{{ val.dueDate }}</td>
                        <td>{{ val.processDefinitionId }}</td>
                        <td>{{ val.processInstanceId }}</td>
                        <td>{{ val.userId }}</td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>

        <v-dialog v-model="dialog"
                transition="dialog-bottom-transition"
                width="500"
        >
            <Todolist 
                    :editMode="true"
                    :inList="false"
                    v-model="newValue"
                    @closeDialog="closeDialog"
            />
        </v-dialog>

        <v-dialog v-model="updateTodolistDialog" 
                transition="dialog-bottom-transition"
                width="500"
        >
            <UpdateTodolist
                    @closeDialog="updateTodolistDialog = false"
            ></UpdateTodolist>
        </v-dialog>
    </div>
</template>

<script>
import BaseGrid from '../base-ui/BaseGrid.vue'
import Todolist from '../Todolist.vue'
import UpdateTodolist from '../UpdateTodolist.vue'

export default {
    name: 'todolistGrid',
    mixins:[BaseGrid],
    components:{
        Todolist,
        UpdateTodolist,
    },
    data: () => ({
        path: 'todolist',
        updateTodolistDialog: false,
    }),
    created() {
        this.init(this.path);
    },
    methods: {
        goInstance(id) {
            this.$router.push(`/instances/${id}`);
        }
    }
}
</script>