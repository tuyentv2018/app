<template>
  <base-layout>
    <template v-slot:sidebar>
      <!-- <div class="logo">
                <img src="../assets/images/btp.png" />
              </div> -->
      <SideBar />
    </template>
    <template v-slot:header>
      <Header :is-show-search="false">
        <div class="flex grow">
          <div class="flex items-center">
            <div class="flex items-center">
              <Transition name="slide-fade"> </Transition>
              <p class="longText pl-5 mb-0 text-xl font-bold">Danh sách kho</p>
              <div class="icon-filter-approval relative group"></div>
            </div>
          </div>
        </div>
      </Header>
    </template>
    <template v-slot:content class="relative">
      <!-- <div
        class="!my-4 !py-[10px] !mx-[10px] bg-slate-500 rounded flex justify-between"
      >
        <div></div>
        <div
          class="button-create-new relative group rounded-md px-2"
          title="Tạo mới web"
          @click="CreateInventory()"
        >
          <p class="text-[14px] mt-1 px-1">Tạo mới kho</p>
        </div>
      </div> -->
      <div
        class="flex rounded items-center justify-between h-14 ml-[10px] bg-slate-50"
      >
        <div class="flex rounded items-center justify-start border-none px-4">
          <input
            class="border rounded-sm w-full py-1 px-2 border-[#DFDFDF] text-gray-700 focus:outline-none focus:shadow-outline"
            id=""
            type="text"
            placeholder="Tìm kiếm..."
            style="width: 250px"
          />
        </div>
        <div class="flex rounded items-center justify-end">
          <div class="rounded-sm border-[#DFDFDF] border-none mx-2">
            <button
              class="hover:bg-[#DFDFDF] p-1 text-white rounded-sm border-transparent hover:border-[#DFDFDF] bg-[#F78119]"
              @click="CreateInventory()"
            >
              <span class="px-2" style="font-weight: 500"
                ><i class="fas fa-plus-circle pr-2"></i>Thêm mới</span
              >
            </button>
          </div>
          <div class="rounded-sm border-[#DFDFDF] border mx-2">
            <button
              class="hover:bg-[#DFDFDF] p-1 text-[#484848] rounded-none border-r-[#DFDFDF] hover:border-[#DFDFDF]"
            >
              <span class="px-2" style="font-weight: 500"
                ><i class="fas fa-filter pr-2"></i>Lọc</span
              >
            </button>
            <button
              class="hover:bg-[#DFDFDF] p-1 text-[#484848] rounded-none border-r-[#DFDFDF] hover:border-[#DFDFDF]"
            >
              <span class="px-2" style="font-weight: 500"
                ><i class="fas fa-file-excel pr-2"></i>Export</span
              >
            </button>
            <button
              class="hover:bg-[#DFDFDF] p-1 text-[#484848] rounded-none border-r-[#DFDFDF] hover:border-[#DFDFDF]"
            >
              <span class="px-2" style="font-weight: 500"
                ><i class="fas fa-file-import pr-2"></i>Import</span
              >
            </button>

            <a-dropdown class="toolClass">
              <template #overlay>
                <a-menu>
                  <a-menu-item key="1">
                    <UserOutlined />
                    1st menu item
                  </a-menu-item>
                  <a-menu-item key="2">
                    <UserOutlined />
                    2nd menu item
                  </a-menu-item>
                  <a-menu-item key="3">
                    <UserOutlined />
                    3rd item
                  </a-menu-item>
                </a-menu>
              </template>
              <a-button>
                <span class="" style="font-weight: 500"
                  ><i class="fas fa-toolbox pr-2"></i>Công cụ</span
                >
                <DownOutlined />
              </a-button>
            </a-dropdown>
          </div>
        </div>
      </div>
      <!-- <div
        class="flex rounded items-center justify-left h-10 ml-[10px] mt-2 bg-slate-50"
      >
        <button
          class="hover:bg-[#DFDFDF] px-4 h-10 text-[#484848] rounded-none border-transparent hover:border-[#DFDFDF]"
          title="Xem theo danh sách"
        >
          <i class="fas fa-list-ul"></i>
        </button>
        <button
          class="hover:bg-[#DFDFDF] px-4 h-10 text-[#484848] rounded-none border-transparent hover:border-[#DFDFDF]"
          title="Xem theo grid"
        >
          <i class="fas fa-th"></i>
        </button>
      </div> -->
      <a-table
        row-key="id"
        class="!p-[5px]"
        :columns="columns"
        :data-source="listInventory"
        :pagination="{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '30'],
          showQuickJumper: true,
          position: ['topRight'],
          showTotal: vnode,
        }"
        :rowSelection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
        }"
        bordered
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'id'">
            <a @click="navigateUpdateInvent(record.id)">Sửa</a>&nbsp;|&nbsp;<a
              @click="handleOpenDeleteInvent(record)"
              >Xóa</a
            >
          </template>
        </template>
        <template>
          <div>
            <a-pagination :total="50" show-less-items />
          </div>
        </template>
      </a-table>
    </template>

    <template v-slot:footer>footer</template>
  </base-layout>
  <!-- <modal-view :isOpen="isOpenCreateInventory" :handleCloseDetail="handleClose">
    <div>
      <h1 class="header-modal">Tạo mới kho</h1>
      <div
        class="text-left p-2 min-h-[300px] max-h-[600px] min-w-[500px] overflow-y-auto format-scroll"
      >
        <div class="">
          <label for="" class="form-group-label">Tên kho</label>
          <div>
            <input
              type="text"
              name=""
              id=""
              class="form-control-input"
              placeholder="Nhập tên kho"
            />
          </div>
        </div>
        <div class="mt-2">
          <label for="" class="form-group-label">Loại kho</label>
          <div>
            <input
              type="text"
              name=""
              id=""
              class="form-control-input"
              placeholder="Nhập mã phòng ban"
            />
          </div>
        </div>
        <div class="mt-2">
          <label for="" class="form-group-label">Quản lý kho</label>
          <div>
            <input
              type="text"
              name=""
              id=""
              class="form-control-input"
              placeholder="Nhập mã phòng ban"
            />
          </div>
        </div>
        <div class="mt-2">
          <label for="" class="form-group-label">Số điện thoại</label>
          <div>
            <input
              type="text"
              name=""
              id=""
              class="form-control-input"
              placeholder="Nhập mã phòng ban"
            />
          </div>
        </div>
        <div class="mt-2">
          <label for="" class="form-group-label">Địa chỉ</label>
          <div>
            <input
              type="number"
              name=""
              id=""
              class="form-control-input"
              placeholder="Nhập số"
            />
          </div>
        </div>
        <div class="mt-2">
          <label for="" class="form-group-label">Quốc gia</label>
          <div>
            <input
              type="number"
              name=""
              id=""
              class="form-control-input"
              placeholder="Nhập số"
            />
          </div>
        </div>
        <div class="mt-2">
          <label for="" class="form-group-label">Tỉnh/Thành phố</label>
          <div>
            <input
              type="number"
              name=""
              id=""
              class="form-control-input"
              placeholder="Nhập chiều rộng"
            />
          </div>
        </div>
        <div class="mt-2">
          <label for="" class="form-group-label">Quận/Huyện</label>
          <div>
            <input
              type="number"
              name=""
              id=""
              class="form-control-input"
              placeholder="Nhập chiều dài"
            />
          </div>
        </div>
        <div class="mt-2">
          <label for="" class="form-group-label">Xã/Phường/Thị trấn</label>
          <div>
            <input
              type="number"
              name=""
              id=""
              class="form-control-input"
              placeholder="Nhập chiều dài"
            />
          </div>
        </div>
        <div class="mt-2">
          <label for="" class="form-group-label">Địa chỉ chi tiết</label>
          <div>
            <input
              type="number"
              name=""
              id=""
              class="form-control-input"
              placeholder="Nhập địa chỉ"
            />
          </div>
        </div>
      </div>
      <div class="bg-button-modal">
        <button class="button-modal">Cập nhật</button>
        <button class="button-close-modal" @click="handleClose">Hủy bỏ</button>
      </div>
    </div>
  </modal-view> -->
  <modal-delete
    :isOpen="isOpenConfirm"
    :handleCloseDetail="handleCloseConfirm"
    :ConfirmDelete="handleDelete"
  >
  </modal-delete>
  <loading-overlay :isLoading="isLoading"></loading-overlay>
</template>

<script setup lang="ts">
  import BaseLayout from '../../../../../layout/baseLayout.vue'
  import SideBar from '../../../../../components/common/SideBar.vue'
  import Header from '../../../../../components/common/Header.vue'
  import { useInventory } from '../../../../../store/modules/inventory/product-invetory'
  import { useRoute, useRouter } from 'vue-router'
  import { ref, reactive, computed } from 'vue'
  import { useToast } from 'vue-toastification'
  import { storeToRefs } from 'pinia'
  import ModalDelete from '../../../../../components/modal/ModalConfirmDelelte.vue'
  import { h } from 'vue'
  const route = useRoute()
  const router = useRouter()
  const toast = useToast()
  const isLoading = ref<boolean>(false)
  const isOpenConfirm = ref<boolean>(false)
  const dataInventory = useInventory()
  dataInventory.getListInventoryAction()
  const { listInventory } = storeToRefs(dataInventory)

  const columns = [
    {
      title: 'Mã kho',
      dataIndex: 'code',
    },
    {
      title: 'Tên kho',
      dataIndex: 'title',
      sorter: (a: DataInventory, b: DataInventory) =>
        a.title.localeCompare(b.title),
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
    },
    {
      title: 'Kích hoạt',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Thuộc nhóm kho',
      dataIndex: `json_type_code`,
      key: 'json_type_code',
      slots: { customRender: 'group' },
    },
    {
      title: 'Người tạo',
      dataIndex: 'fullname',
      key: 'fullname',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Thao tác',
      dataIndex: 'id',
      key: 'id',
    },
  ]

  const navigateUpdateInvent = (id: number) => {
    router.push(`/update-inventory/${id}`)
  }
  const idSelected = ref()
  const handleOpenDeleteInvent = (record: any) => {
    isOpenConfirm.value = true
    idSelected.value = record.id
  }
  const handleCloseConfirm = () => {
    isOpenConfirm.value = false
  }
  const EndTimeLoading = () => {
    isLoading.value = false
  }
  const handleDelete = () => {
    isLoading.value = true
    dataInventory.deleteInventoryAction(
      Number(idSelected.value),
      EndTimeLoading,
      toast,
      handleCloseConfirm
    )
  }
  const vnode = () => [
    h(
      'button', // type
      {
        id: 'foo',
        class: 'addButton',
        innerHTML: '<i class="fas fa-th"></i>',
        onClick(event: any) {
          alert('abc')
        },
      }, // props
      [
        /* children */
      ]
    ),
    h(
      'button', // type
      {
        id: 'foo',
        class: 'addButton1',
        innerHTML: '<i class="fas fa-list-ul"></i>',
        onClick(event: any) {
          alert('abc')
        },
      }, // props
      [
        /* children */
      ]
    ),
  ]

  // const showButton = () => {
  //   return (<div><Foo />
  //     <Bar />
  //   </div>
  // )
  // }
  // const vnode = <div id={dynamicId}>hello, {userName}</div>
  const selectedRowKeys = ref([])
  const onSelectChange = (selectedRowKeys1: any) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys1)
    selectedRowKeys.value = selectedRowKeys1
  }
  // const rowSelection = ref({
  //   checkStrictly: false,
  //   onChange: (
  //     selectedRowKeys: (string | number)[],
  //     selectedRows: DataItem[]
  //   ) => {
  //     console.log(
  //       `selectedRowKeys: ${selectedRowKeys}`,
  //       'selectedRows: ',
  //       selectedRows
  //     )
  //   },
  //   onSelect: (
  //     record: DataItem,
  //     selected: boolean,
  //     selectedRows: DataItem[]
  //   ) => {
  //     console.log(record, selected, selectedRows)
  //   },
  //   onSelectAll: (
  //     selected: boolean,
  //     selectedRows: DataItem[],
  //     changeRows: DataItem[]
  //   ) => {
  //     console.log(selected, selectedRows, changeRows)
  //   },
  // })
  const CreateInventory = () => {
    router.push('/create-inventory')
  }
</script>
<style>
  #components-layout-demo-side .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
  }

  .site-layout .site-layout-background {
    background: #fff;
  }

  .ant-layout-header {
    height: 60px;
  }

  .modal-menu-box {
    position: absolute;
    top: 50px;
    right: 0px;
    z-index: 9999;
    justify-items: center;
  }
  .button-create {
    cursor: pointer;
    margin-left: 10px;
    margin-right: 10px;
    min-height: 30px;
    min-width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: var(--color-primary);
    font-size: 1.3em;
    color: white;
  }

  .button-create::before {
    font-family: 'Font Awesome 5 Pro';
    content: '\f067';
    font-weight: 500;
  }
  .ant-btn {
    /* line-height: 1.5715;
    position: relative;
    display: inline-block;
    font-weight: 400;
    white-space: nowrap;
    text-align: center;
    background-image: none;
    border: 1px solid transparent;
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    touch-action: manipulation;
    height: 32px;
    padding: 4px 15px;
    font-size: 14px;
    border-radius: 2px; */
    border-radius: 0px;
    padding: 4px 10px;
    color: rgba(0, 0, 0, 0.85);
    border-color: transparent;
    color: #484848;
    background: #fff;
  }
  .ant-btn:hover {
    background-color: #dfdfdf;
    color: #484848;
    border-color: #dfdfdf;
  }
  .addButton {
    position: absolute;
    left: 10px;
    min-width: 32px;
    height: 32px;
    margin-right: 8px;
  }
  .addButton1 {
    position: absolute;
    left: 40px;
    min-width: 32px;
    height: 32px;
    margin-right: 8px;
    margin-left: 8px;
    /* border-radius: 2px;
    border-color: #484848; */
  }
  .ant-pagination {
    background-color: white;
    box-sizing: border-box;
    margin: 0;
    padding: 8px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5715;
    list-style: none;
    font-feature-settings: 'tnum';
}
</style>
