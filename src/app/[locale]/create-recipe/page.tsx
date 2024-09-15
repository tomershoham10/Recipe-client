'use client';
import PlusButton from '@/components/(buttons)/PlusButton';
import Chips from '@/components/Chip';
import Dropdown, { DropdownSizes } from '@/components/Dropdown/page';
import Dropzone from '@/components/Dropzone/page';
import Input, { InputTypes } from '@/components/Input/page';
import Textbox, { FontSizes } from '@/components/Textbox/page';
import { useTranslations } from 'next-intl';

const CreateRecipe: React.FC = () => {
  const t = useTranslations('createRecipe');
  return (
    <section className='flex h-full w-full flex-row'>
      <section className='flex w-full basis-1/2 flex-col gap-3 border-l-2 pr-3 pt-4'>
        <p className='pr-4 text-5xl font-bold'>{t('createRecipe')}</p>
        <section className='mr-4 w-4/5 rounded-2xl bg-white px-4 py-2'>
          <p className='mb-1 text-xl font-semibold opacity-80'>
            {t('addRecipeName')}
          </p>
          <Input
            type={InputTypes.TEXT}
            value={undefined}
            onChange={(e) => console.log(e)}
          />
        </section>

        <section className='mr-4 w-4/5 rounded-2xl bg-white px-4 py-2'>
          <p className='mb-1 text-xl font-semibold opacity-80'>
            {t('addRecipeDescription')}
          </p>
          <Textbox
            isEditMode={false}
            fontSizeProps={FontSizes.MEDIUM}
            value={undefined}
            onChange={(text: string) => {}}
          />
        </section>

        <section className='mr-4 w-4/5 rounded-2xl bg-white px-4 py-2'>
          <p className='mb-1 text-xl font-semibold opacity-80'>
            {t('uploadRecipePictue')}
          </p>
          <Dropzone onFilesChanged={(files: File[]) => {}} />
        </section>
      </section>
      <section className='h-full w-full basis-1/2 overflow-y-auto py-4 pr-3'>
        <section className='relative mr-4 h-fit w-4/5 rounded-2xl bg-white px-4 pb-7 pt-2'>
          <p className='mb-1 text-3xl font-bold'>{t('addRecipeIngredients')}</p>
          <section className='bg-recipeGray-default mb-3 rounded-xl px-4 py-2'>
            <p className='mb-1 text-xl font-semibold opacity-80'>
              {t('sectionName')}
            </p>
            <section className='flex flex-row items-center justify-between'>
              <section className='w-[40%]'>
                <p className='text-lg font-semibold opacity-60'>
                  {t('sectionName')}
                </p>
                <Dropdown
                  isSearchable={true}
                  placeholder={'Mitzrachim'}
                  items={[]}
                  onChange={() => {}}
                  size={DropdownSizes.SMALL}
                />
              </section>
              <section className='w-[25%]'>
                <p className='text-lg font-semibold opacity-60'>
                  {t('sectionName')}
                </p>
                <Dropdown
                  isSearchable={true}
                  placeholder={'Units'}
                  items={[]}
                  onChange={() => {}}
                  size={DropdownSizes.SMALL}
                />
              </section>
              <section className='w-[20%]'>
                <p className='text-lg font-semibold opacity-60'>quantity</p>
                <Input
                  type={InputTypes.NUMBER}
                  value={undefined}
                  onChange={() => {}}
                />
              </section>
              <PlusButton
                onClick={() => {}}
                className='mt-6 bg-recipeGray-light'
              />
            </section>
            <section className='mt-2 flex flex-row flex-wrap gap-3'>
              <Chips
                values={[
                  '1 kg flour',
                  '1 kg flour',
                  '1 kg flour',
                  '1 kg flour',
                  '1 kg flour',
                ]}
                onClick={() => {}}
              />
            </section>
          </section>

          <section className='bg-recipeGray-default mb-3 rounded-xl px-4 py-2'>
            <p className='mb-1 text-xl font-semibold opacity-80'>
              {t('sectionName')}
            </p>
            <section className='flex flex-row items-center justify-between'>
              <section className='w-[40%]'>
                <p className='text-lg font-semibold opacity-60'>
                  {t('sectionName')}
                </p>
                <Dropdown
                  isSearchable={true}
                  placeholder={'Mitzrachim'}
                  items={[]}
                  onChange={() => {}}
                  size={DropdownSizes.SMALL}
                />
              </section>
              <section className='w-[25%]'>
                <p className='text-lg font-semibold opacity-60'>
                  {t('sectionName')}
                </p>
                <Dropdown
                  isSearchable={true}
                  placeholder={'Units'}
                  items={[]}
                  onChange={() => {}}
                  size={DropdownSizes.SMALL}
                />
              </section>
              <section className='w-[20%]'>
                <p className='text-lg font-semibold opacity-60'>quantity</p>
                <Input
                  type={InputTypes.NUMBER}
                  value={undefined}
                  onChange={() => {}}
                />
              </section>
              <PlusButton
                onClick={() => {}}
                className='mt-6 bg-recipeGray-light'
              />
            </section>
            <section className='mb-1 mt-3 flex flex-row flex-wrap gap-3'>
              <Chips
                values={[
                  '1 kg flour',
                  '1 kg flour',
                  '1 kg flour',
                  '1 kg flour',
                ]}
                onClick={() => {}}
              />
            </section>
          </section>

          <section className='bg-recipeGray-default mb-3 rounded-xl px-4 py-2'>
            <p className='mb-1 text-xl font-semibold opacity-80'>
              {t('sectionName')}
            </p>
            <section className='flex flex-row items-center justify-between'>
              <section className='w-[40%]'>
                <p className='text-lg font-semibold opacity-60'>
                  {t('sectionName')}
                </p>
                <Dropdown
                  isSearchable={true}
                  placeholder={'Mitzrachim'}
                  items={[]}
                  onChange={() => {}}
                  size={DropdownSizes.SMALL}
                />
              </section>
              <section className='w-[25%]'>
                <p className='text-lg font-semibold opacity-60'>
                  {t('sectionName')}
                </p>
                <Dropdown
                  isSearchable={true}
                  placeholder={'Units'}
                  items={[]}
                  onChange={() => {}}
                  size={DropdownSizes.SMALL}
                />
              </section>
              <section className='w-[20%]'>
                <p className='text-lg font-semibold opacity-60'>quantity</p>
                <Input
                  type={InputTypes.NUMBER}
                  value={undefined}
                  onChange={() => {}}
                />
              </section>
              <PlusButton
                onClick={() => {}}
                className='mt-6 bg-recipeGray-light'
              />
            </section>
          </section>
          <PlusButton
            onClick={() => {}}
            className='absolute bottom-1 left-1/2 -translate-x-1/2 transform'
          />
        </section>
      </section>
    </section>
  );
};

export default CreateRecipe;
